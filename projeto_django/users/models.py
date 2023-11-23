from django.db import models


# Create your models here.
class Usuarios(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=45)
    email = models.EmailField(unique=True, max_length=45)
    senha = models.CharField(max_length=45)
    curso = models.CharField(max_length=45)
    categoria = models.CharField(
        max_length=45, choices=[("aluno", "Aluno"), ("monitor", "Monitor")]
    )
    contato_numero1 = models.CharField(max_length=11, blank=True)
    contato_numero2 = models.CharField(max_length=11, blank=True)
    foto_perfil = models.TextField(null=True, blank=True)

    class Meta:
        db_table = "usuarios"

    def __str__(self):
        return self.nome


class Monitores(models.Model):
    id_monitor = models.OneToOneField(
        "Usuarios", on_delete=models.CASCADE, primary_key=True
    )
    nota_avaliacao = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True
    )
    assuntos_ensinados = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "monitores"


class Interesse(models.Model):
    aluno = models.ForeignKey(
        Usuarios, related_name="interesses", on_delete=models.CASCADE
    )
    monitor = models.ForeignKey(
        Usuarios, related_name="aulas_dadas", on_delete=models.CASCADE
    )

    class Meta:
        db_table = "interesse"


class Administrador(models.Model):
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=255)
    foto_perfil = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = "administradores"
