from django.contrib import admin


from .models import AutomobileVO, SalesPerson, Customer, SalesRecord


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
