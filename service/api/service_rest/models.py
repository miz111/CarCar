from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    model_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.year} {self.model_name} {self.color}"

    class Meta:
        verbose_name_plural = "Automobile VOs"


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.pk})

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("name",)


class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17)
    customer_name = models.CharField(max_length=200)
    date_time = models.DateTimeField()
    technician = models.ForeignKey(
        Technician,
        related_name="service_appointment",
        on_delete=models.PROTECT,
    )
    reason = models.CharField(max_length=200)
    vip_treatment = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.customer_name}'s appointment"

    def save(self, *args, **kwargs):
        registered = AutomobileVO.objects.filter(vin=self.vin)
        self.vip_treatment = len(registered) > 0
        super().save(*args, **kwargs)

    def change_status(self):
        self.is_finished = not self.is_finished
        self.save()

    class Meta:
        ordering = ("date_time", "customer_name")
