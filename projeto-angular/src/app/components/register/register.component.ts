import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  typeInputPass: string = 'password';
  typeEye: string = 'bi bi-eye-fill';

  coursesList = [
    'Administração',
    'Análise e Desenvolvimento de Sistemas',
    'Arquitetura e Urbanismo',
    'Artes Visuais',
    'Biomedicina',
    'Ciência de Dados e Inteligência Artificial',
    'Ciências Biológicas (Bacharelado)',
    'Ciências Biológicas (Licenciatura)',
    'Ciências Contábeis',
    'Ciências Econômicas',
    'Comércio Exterior',
    'Dança',
    'Design',
    'Design de Interiores',
    'Direito',
    'Educação Física - Bacharelado',
    'Educação Física - Licenciatura',
    'Enfermagem',
    'Engenharia Agronômica',
    'Engenharia Ambiental',
    'Engenharia Civil',
    'Engenharia da Computação',
    'Engenharia de Alimentos',
    'Engenharia de Bioprocessos e Biotecnologia',
    'Engenharia de Controle e Automação',
    'Engenharia de Produção',
    'Engenharia Elétrica',
    'Engenharia Mecânica',
    'Engenharia Química',
    'Estética e Cosmética',
    'Farmácia',
    'Filosofia',
    'Fisioterapia',
    'Fonoaudiologia',
    'Gastronomia',
    'Gestão Comercial',
    'Gestão da Qualidade',
    'Gestão de Equinocultura',
    'Gestão de Recursos Humanos',
    'Gestão Financeira',
    'História',
    'Hotelaria',
    'Jogos Digitais',
    'Jornalismo',
    'Letras: Português/Inglês',
    'Logística',
    'Marketing',
    'Matemática',
    'Medicina Veterinária',
    'Moda',
    'Música',
    'Nutrição',
    'Odontologia',
    'Pedagogia',
    'Processos Gerenciais',
    'Psicologia',
    'Publicidade e Propaganda',
    'Química',
    'Química Industrial',
    'Relações Internacionais',
    'Relações Públicas',
    'Teatro',
    'Terapia Ocupacional',
  ];

  registerForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    curso: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    senhaConfirmacao: ['', Validators.required],
    tipoCadastro: ['', Validators.required],
  });

  compressOptions: string = 'compressed';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  changeVisibility() {
    this.typeInputPass == 'password'
      ? (this.typeInputPass = 'text')
      : (this.typeInputPass = 'password');

    this.typeEye == 'bi bi-eye-fill'
      ? (this.typeEye = 'bi bi-eye-slash-fill')
      : (this.typeEye = 'bi bi-eye-fill');
  }

  registerSubmit() {
    const senha = this.registerForm.value.senha;
    const senhaConfir = this.registerForm.value.senhaConfirmacao;

    senha != senhaConfir
      ? console.log('Senhas não coincidem, tente novamente')
      : console.log(this.registerForm.value);
  }
}
