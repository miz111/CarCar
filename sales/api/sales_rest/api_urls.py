from django.urls import path

from .api_views import(
    api_list_sales_person,
    api_show_sales_person,
    api_list_customer,
    api_show_customer,
    api_list_sales_record,
    api_show_sales_record,
)

urlpatterns = [
    path("salesperson/", api_list_sales_person, name="api_create_salesperson"),
    path("salesperson/<int:pk>/", api_show_sales_person, name="api_show_sales_person"),
    path("customer/", api_list_customer, name="api_create_customer"),
    path("customer/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("salesrecord/", api_list_sales_record, name="api_create_record"),
    path("salesrecord/<int:pk>/", api_show_sales_record, name="api_show_sales_record"),
]
