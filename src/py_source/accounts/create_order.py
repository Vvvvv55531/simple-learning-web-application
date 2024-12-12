from django.db import transaction
from decimal import Decimal
from accounts.models import Product, Order, OrderItem

def create_order(customer_name, customer_email, cart_items):

    try:
        with transaction.atomic():
            # Создаем новый заказ
            order = Order.objects.create(
                customer_name=customer_name,
                customer_email=customer_email
            )

            # Обрабатываем каждый товар в корзине
            for item in cart_items:
                product_id = item.get("product_id")
                quantity = item.get("quantity")

                # Получаем товар из БД
                product = Product.objects.get(id=product_id)

                # Расчет итоговой цены для позиции
                total_price = Decimal(quantity) * product.price

                # Создаем запись в OrderItem
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=quantity,
                    total_price=total_price
                )

            return order
    except Exception as e:
        print(f"Ошибка при создании заказа: {e}")
        raise
