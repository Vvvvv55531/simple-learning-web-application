from django.core.management.base import BaseCommand
from django.db import connection
from django.db import models
from accounts.models import Product
from app.neural_network import generate_product_data


class Command(BaseCommand):

    def create_table_if_not_exists(self):
       
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT COUNT(*) 
                FROM information_schema.tables 
                WHERE table_name = 'accounts_product';
            """)
            table_exists = cursor.fetchone()[0]

        if not table_exists:
         
            with connection.schema_editor() as schema_editor:
                schema_editor.create_model(Product)
            self.stdout.write("Таблица 'Product' успешно создана.")
        else:
            self.stdout.write("Таблица 'Product' уже существует.")

    def handle(self, *args, **kwargs):
        
        self.create_table_if_not_exists()

        for _ in range(10):  # Генерация 10 товаров
            data = generate_product_data()

            # Сохранение товара в базу данных
            product = Product.objects.create(
                name=data["name"].encode("utf-8", errors="replace").decode("utf-8"),
                description=data["description"].encode("utf-8", errors="replace").decode("utf-8"),
                image_url=data["image_url"],
            )
            self.stdout.write(f"Товар '{product.name}' успешно добавлен.")
