from django.shortcuts import render
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord
from common.json import ModelEncoder
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


class AutomobileListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "id", "color", "year", "vin", "model_name", "is_sold"]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["name", "employee_number", "id"]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["name", "address", "phone_number", "id"]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = ["price", "automobile", "sales_person", "customer", "id"]
    encoders = {
        "automobile": AutomobileListEncoder(),
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder()
    }

@require_http_methods(["GET", "POST"])
def api_list_sales_person(request):
    if request.method == "GET":
        sales_persons = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons": sales_persons},
            encoder=SalesPersonEncoder,
    )
    elif request.method == "POST":
        content = json.loads(request.body)
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_sales_person(request, pk):
    if request.method == "GET":
        sales_person = SalesPerson.objects.get(id=pk)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = SalesPerson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    elif request.method == "PUT":
        content = json.loads(request.body)
        SalesPerson.objects.filter(id=pk).update(**content)
        sales_person = SalesPerson.objects.get(id=pk)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_customer(request, pk):
    if request.method == "GET":
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    elif request.method == "PUT":
        content = json.loads(request.body)
        Customer.objects.filter(id=pk).update(**content)
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_sales_record(request):
    if request.method == "GET":
        sales_records = SalesRecord.objects.all()
        return JsonResponse(
            {"sales_records": sales_records},
            encoder=SalesRecordEncoder,
            safe=False
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        automobile = AutomobileVO.objects.get(vin=content["vin"])
        content["automobile"] = automobile
        sales_person = SalesPerson.objects.get(employee_number=content["sales_person"])
        content["sales_person"] = sales_person
        customer = Customer.objects.get(id=content["customer"])
        content["customer"] = customer
        del content["vin"]
        sales_record = SalesRecord.objects.create(**content)
        return JsonResponse(
            sales_record,
            encoder=SalesRecordEncoder,
            safe=False
        )

@require_http_methods(["GET", "PUT"])
def api_show_sales_record(request, pk):
    if request.method == "GET":
        sales_record = SalesRecord.objects.get(id=pk)
        return JsonResponse(
            sales_record,
            encoder=SalesRecordEncoder,
            safe=False
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        SalesRecord.objects.filter(id=pk).update(**content)
        sales_record = SalesRecord.objects.get(id=pk)
        return JsonResponse(
            sales_record,
            encoder=SalesRecordEncoder,
            safe=False,
        )

@require_http_methods(["GET"])
def api_list_sales_history(request, sales_person_id):
    sales_records = SalesRecord.objects.filter(sales_person=sales_person_id)
    return JsonResponse(
        {"sales_records": sales_records},
        encoder=SalesRecordEncoder,
    )
