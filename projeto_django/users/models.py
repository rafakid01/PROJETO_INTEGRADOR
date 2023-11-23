from django.db import models


# Create your models here.
class Usuario(models.Model):
    nome = models.CharField(max_length=80)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=255)
    curso = models.CharField(max_length=50)
    categoria = models.CharField(
        max_length=10, choices=[("aluno", "Aluno"), ("monitor", "Monitor")]
    )
    contato_numero_1 = models.CharField(max_length=15, blank=True)
    contato_numero_2 = models.CharField(max_length=15, blank=True)
    foto_perfil = models.TextField(
        blank=True
    )  # Considerando que a foto seja salva em base64

    def __str__(self):
        return self.nome

    class Meta:
        db_table = "usuarios"


class Monitor(models.Model):
    user = models.OneToOneField(
        "users.Usuario", on_delete=models.CASCADE, primary_key=True
    )
    nota_avaliacao = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True
    )
    descricao = models.TextField()

    def __str__(self):
        return f"Monitor: {self.user.nome}"

    class Meta:
        db_table = "monitores"


class Assunto(models.Model):
    titulo = models.CharField(max_length=255)
    monitores = models.ManyToManyField("users.Monitor", related_name="assuntos")

    def __str__(self):
        return self.titulo

    class Meta:
        db_table = "assuntos"


class Admin(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=255)
    foto_perfil = models.TextField()  # Considerando que a foto seja salva em base64

    def __str__(self):
        return self.nome

    class Meta:
        db_table = "administradores"


class Interesse(models.Model):
    aluno = models.ForeignKey("users.Usuario", on_delete=models.CASCADE)
    monitor = models.ForeignKey("users.Monitor", on_delete=models.CASCADE)
    data_interesse = models.DateTimeField(default="1970-01-01T00:00:00Z")

    def __str__(self):
        return f"{self.aluno.nome} está interessado em {self.monitor.user.nome}"

    class Meta:
        db_table = "interesse"
