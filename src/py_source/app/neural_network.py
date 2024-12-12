import random
from django.conf import settings
import requests
import os
from huggingface_hub import InferenceClient
import re
from PIL import Image
import time
from accounts.models import Product 
from googletrans import Translator

HUGGINGFACE_API_TOKEN = "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"

def generate_text(prompt):
    """
    Генерация текста на основе промта с учетом случайности.
    """
    API_URL = "https://api-inference.huggingface.co/models/gpt2"
    HF_AUTH_TOKEN = HUGGINGFACE_API_TOKEN

    headers = {"Authorization": f"Bearer {HF_AUTH_TOKEN}"}
    payload = {
        "inputs": prompt, 
        "parameters": {
            "max_length": 100, 
            "num_return_sequences": 1,
            "temperature": random.uniform(0.6, 1.0), 
            "top_p": random.uniform(0.7, 1.0),       
        }
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code != 200:
        raise Exception(f"Ошибка при генерации текста: {response.status_code}, {response.text}")

    return response.json()[0]["generated_text"]

def generate_product_data():
    """
    Генерация данных для нового товара и их сохранение в БД.
    """
    client = InferenceClient(api_key=HUGGINGFACE_API_TOKEN)

    prompts = [
        "Generate a unique name and description for a pair of sneakers in a casual style.  Provide detailed description with simple phrases and do not include name of product in it. Format: Name: <name>, Description: <description>.",
        "Provide a name and description for a modern, fashionable pair of sneakers.  Provide detailed description with simple phrases and do not include name of product in it. Format: Name: <name>, Description: <description>.",
        "Suggest a name and description for a stylish pair of sneakers suitable for everyday wear. Provide detailed description with simple phrases and do not include name of product in it. Format: Name: <name>, Description: <description>.",
    ]

    selected_prompt = random.choice(prompts)
    messages = [{"role": "user", "content": selected_prompt}]

    completion = client.chat.completions.create(
        model="microsoft/Phi-3-mini-4k-instruct",
        messages=messages,
        max_tokens=500,
        temperature=random.uniform(0.6, 1.0),
        top_p=random.uniform(0.7, 1.0),
    )

    response = completion.choices[0].message["content"]
    print("Сгенерированный ответ:", response)

    try:
        name, description = parse_product_text_from_completion(response)
    except Exception as e:
        print("Ошибка обработки текста:", e)
        name, description = "Base Product", "Default description"

    # Генерация случайной цены в диапазоне 50-200
    price = round(random.uniform(50.0, 200.0), 2)

    description_russian = translate_text_to_russian(description)
    # Генерация URL изображения
    image_url = generate_image(description)
    print("URL изображения:", image_url)

    # Сохранение товара в базе данных
    product = Product.objects.create(
        name=name,
        description=description_russian,
        price=price,
        image_url=image_url,
    )

    return product


def translate_text_to_russian(description, max_retries=5, wait_time=30):
    """
    Перевод описания продукта на русский язык, оставляя название без изменений.
    """
    API_URL = "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-ru"
    HF_AUTH_TOKEN = HUGGINGFACE_API_TOKEN

    headers = {"Authorization": f"Bearer {HF_AUTH_TOKEN}"}
    payload = {"inputs": description}

    for attempt in range(max_retries):
        try:
            response = requests.post(API_URL, headers=headers, json=payload)

            if response.status_code == 200:
                # Успешный ответ, возвращаем переведённое описание
                translated_description = response.json()[0]["translation_text"]
                return translated_description

            elif response.status_code == 503:
                # Модель загружается, ждём перед повторной попыткой
                error_data = response.json()
                estimated_time = error_data.get("estimated_time", wait_time)
                print(f"Модель загружается. Повторная попытка через {estimated_time:.2f} секунд...")
                time.sleep(estimated_time)
            else:
                # Другая ошибка, возвращаем исходное описание
                print(f"Ошибка при переводе текста: {response.status_code}, {response.text}")
                return description
        except Exception as e:
            print(f"Исключение при переводе текста: {e}")
            return description

    # Если все попытки исчерпаны, возвращаем оригинальное описание
    print("Все попытки исчерпаны. Возвращаем оригинальное описание.")
    return description

def generate_image(description, max_retries=5, wait_time=30):
    """
    Генерация изображения по описанию с использованием API HuggingFace.
    Возвращает URL изображения или заглушки в случае ошибки.
    """
    API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2"
    HF_AUTH_TOKEN = HUGGINGFACE_API_TOKEN

    headers = {"Authorization": f"Bearer {HF_AUTH_TOKEN}"}
    payload = {"inputs": description}

    for attempt in range(max_retries):
        try:
            response = requests.post(API_URL, headers=headers, json=payload, stream=True)

            if response.status_code == 200:
                # Сохраняем сгенерированное изображение
                media_dir = "media/images"
                os.makedirs(media_dir, exist_ok=True)
                image_filename = f"generated_image_{random.randint(0, 9999)}.png"
                image_path = os.path.join(media_dir, image_filename)

                with open(image_path, "wb") as f:
                    for chunk in response.iter_content(chunk_size=1024):
                        f.write(chunk)

                return f"{settings.MEDIA_URL}images/{image_filename}"

            elif response.status_code == 503:
                # Модель загружается — ждем и пробуем снова
                error_data = response.json()
                estimated_time = error_data.get("estimated_time", wait_time)
                print(f"Модель загружается. Повторная попытка через {estimated_time:.2f} секунд...")
                time.sleep(estimated_time)
            else:
                # Другая ошибка HTTP
                print(f"Ошибка при генерации изображения: {response.status_code}, {response.text}")
                return generate_placeholder_image()

        except Exception as e:
            # Обработка исключений
            print("Ошибка при генерации изображения:", e)
            return generate_placeholder_image()

    # Если все попытки исчерпаны, возвращаем заглушку
    print("Все попытки исчерпаны. Возвращаем заглушку.")
    return generate_placeholder_image()


def generate_placeholder_image():
    """
    Генерация изображения-затычки (1x1 пиксель) для обработки ошибок.
    Возвращает URL заглушки.
    """
    media_dir = "media/images"
    os.makedirs(media_dir, exist_ok=True)
    placeholder_filename = "placeholder_image.png"
    placeholder_path = os.path.join(media_dir, placeholder_filename)

    if not os.path.exists(placeholder_path):
        # Создаем заглушку только если она еще не существует
        img = Image.new('RGB', (1, 1), color=(255, 255, 255))  # Белое изображение
        img.save(placeholder_path)

    return f"{media_dir}/{placeholder_filename}"
    



def parse_product_text_from_completion(response):

    try:

        match = re.search(r"(Name:\s*(.*?))\s*(Description:\s*(.*))", response.strip(), re.DOTALL)
        
        if match:
            name = match.group(2).strip()
            description = match.group(4).strip()
        else:

            match_comma = re.search(r"Name:\s*(.*?),\s*Description:\s*(.*)", response.strip())
            if match_comma:
                name = match_comma.group(1).strip()
                description = match_comma.group(2).strip()
            else:
                raise ValueError("Ответ не соответствует ожидаемому формату.")
        
        return name, description
    
    except Exception as e:
        print("Ошибка при парсинге текста:", e)
        return "Base Product", "Default description"