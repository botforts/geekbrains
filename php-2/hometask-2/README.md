# GeekBrains. PHP. Уровень 2.
Преподаватель: Игорь Полуянов.
<br>https://geekbrains.ru/courses/5

## Урок 2. ООП в PHP. Расширенное изучение.
Ключевое слово parent. Абстрактные классы и интерфейсы. Когда нужны классы, а когда интерфейсы? Перегрузка и магические методы. Перегрузка методов. Магический метод __toString(). Контроль типа. Пространства имён. Трейты.

### Домашнее задание

1. Создать структуру классов ведения товарной номенклатуры.

- Есть абстрактный товар.

- Есть цифровой товар, штучный физический товар и товар на вес.

- У каждого есть метод подсчёта финальной стоимости.

- У цифрового товара стоимость постоянная и дешевле штучного товара в два раза, у штучного товара обычная стоимость, у весового – в зависимости от продаваемого количества в килограммах. У всех формируется в конечном итоге доход с продаж.

- Что можно вынести в абстрактный класс, наследование?

### Дополнительные задания

1. Сделать автозагрузчик на основе "namespaces";

2. Сделать у себя в проекте абстрактный класс Model:

3. Сделать классы-наследники от Model, описывающие несколько
сущностей интернет-магазина (пр: Заказ, категория, корзина и т.п.);