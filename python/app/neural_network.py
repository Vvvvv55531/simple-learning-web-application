import random
import requests
import os
from huggingface_hub import InferenceClient
import re
from PIL import Image

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
            "temperature": random.uniform(0.6, 1.0),  # Используем случайную температуру
            "top_p": random.uniform(0.7, 1.0),        # Используем случайный top_p
        }
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code != 200:
        raise Exception(f"Ошибка при генерации текста: {response.status_code}, {response.text}")

    return response.json()[0]["generated_text"]

def generate_product_data():
    """
    Генерация данных товара: имя, описание, изображение.
    """
    client = InferenceClient(api_key=HUGGINGFACE_API_TOKEN)

    prompts = [
        "Generate a unique name and description for a clothing product in a casual style. Format: Name: <name>, Description: <description>.",
        "Provide a name and description for a modern, fashionable piece of clothing. Format: Name: <name>, Description: <description>.",
        "Suggest a name and description for a stylish garment suitable for everyday wear. Format: Name: <name>, Description: <description>.",
    ]
    
    selected_prompt = random.choice(prompts)

    messages = [
        {
            "role": "user",
            "content": selected_prompt
        }
    ]
    
    completion = client.chat.completions.create(
        model="microsoft/Phi-3-mini-4k-instruct", 
        messages=messages, 
        max_tokens=500,
        temperature=random.uniform(0.6, 1.0),  # Добавляем случайность в параметр температуры
        top_p=random.uniform(0.7, 1.0),        # И в параметр top_p
    )

    response = completion.choices[0].message["content"]
    print("Сгенерированный ответ: ", response)

    # Обрабатываем текст
    try:
        name, description = parse_product_text_from_completion(response)
    except Exception as e:
        print("Ошибка обработки текста:", e)
        name = "Base Product"
        description = "Default description"

    # Кодирование с использованием utf-8
    name = name.encode('utf-8', errors='replace').decode('utf-8')
    description = description.encode('utf-8', errors='replace').decode('utf-8')

    print("Name:", name, "Description:", description)

    # Генерация изображения
    image_url = generate_image(description)

    return {
        "name": name,
        "description": description,
        "image_url": image_url,
    }

def generate_image(description):
    """
    Генерация изображения по описанию с использованием API HuggingFace.
    В случае ошибки возвращается изображение-затычка.
    """
    API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2"
    HF_AUTH_TOKEN = HUGGINGFACE_API_TOKEN

    headers = {"Authorization": f"Bearer {HF_AUTH_TOKEN}"}
    payload = {"inputs": description}

    try:
        response = requests.post(API_URL, headers=headers, json=payload)

        if response.status_code != 200:
            # Если ошибка, генерируем затычку
            return generate_placeholder_image()

        # Если все в порядке, сохраняем изображение
        image_data = response.content
        media_dir = "media/images"
        os.makedirs(media_dir, exist_ok=True)
        image_filename = f"generated_image_{random.randint(0, 9999)}.png"
        image_path = os.path.join(media_dir, image_filename)

        with open(image_path, "wb") as f:
            f.write(image_data)

        return f"/{media_dir}/{image_filename}"
    
    except Exception as e:
        # В случае ошибки генерируем затычку
        return generate_placeholder_image()
    
def generate_placeholder_image():
    """
    Генерация изображения-затычки (1x1 пиксель) для обработки ошибок.
    """
    media_dir = "media/images"
    os.makedirs(media_dir, exist_ok=True)
    placeholder_filename = "placeholder_image.png"
    placeholder_path = os.path.join(media_dir, placeholder_filename)

    # Создаем изображение 1x1 пиксель с белым цветом
    img = Image.new('RGB', (1, 1), color = (255, 255, 255))  # Белое изображение
    img.save(placeholder_path)

    return f"/{media_dir}/{placeholder_filename}"

import re

def parse_product_text_from_completion(response):
    """
    Парсинг текста для извлечения имени и описания товара.
    Поддерживает разные форматы, включая разделение через запятую.
    """
    try:
        # Используем регулярное выражение для извлечения имени и описания в разных форматах
        match = re.search(r"(Name:\s*(.*?))\s*(Description:\s*(.*))", response.strip(), re.DOTALL)
        
        if match:
            name = match.group(2).strip()
            description = match.group(4).strip()
        else:
            # Если формат не соответствует, пытаемся найти разделение через запятую
            match_comma = re.search(r"Name:\s*(.*?),\s*Description:\s*(.*)", response.strip())
            if match_comma:
                name = match_comma.group(1).strip()
                description = match_comma.group(2).strip()
            else:
                raise ValueError("Ответ не соответствует ожидаемому формату.")
        
        return name, description
    
    except Exception as e:
        print("Ошибка при парсинге текста:", e)
        # Если возникла ошибка, возвращаем значения по умолчанию
        return "Base Product", "Default description"