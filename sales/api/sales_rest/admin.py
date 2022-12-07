from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord


admin.site.register(AutomobileVO)
admin.site.register(SalesPerson)
admin.site.register(Customer)
admin.site.register(SalesRecord)
