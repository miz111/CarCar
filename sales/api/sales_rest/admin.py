from django.contrib import admin

# Register your models here.

from .models import AutomobileVO, SalesPerson, Customer, SalesRecord


# admin.site.register(AutomobileVO)
# admin.site.register(SalesPerson)
# admin.site.register(Customer)
# admin.site.register(SalesRecord)

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "vin",
        "color",
        "year",
        "model_name",
        "is_sold",
    )

@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "employee_number",
    )

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "address",
        "phone_number",
    )

@admin.register(SalesRecord)
class SalesRecord(admin.ModelAdmin):
    list_display = (
        "id",
        "sales_person",
        "customer",
        "price",
        "automobile",
    )
