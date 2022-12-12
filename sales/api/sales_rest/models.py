from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)
    model_name = models.CharField(max_length=100)
    is_sold = models.BooleanField(default=False)

class SalesPerson(models.Model):
    name =  models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(unique=True)

class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20, unique=True)

class SalesRecord(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales_records",
        on_delete=models.PROTECT
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales_records",
        on_delete=models.PROTECT
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales_records",
        on_delete=models.PROTECT
    )
