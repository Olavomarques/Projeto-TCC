import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'parte_fisica.dart';
import 'parte_mental.dart'; // ✅ ADICIONE ESTE IMPORT
import '../services/localStorage.dart';
import 'login.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final LocalStorageService localStorage = LocalStorageService();
  String? userId;
  String? userEmail;

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  Future<void> _loadUserData() async {
    final id = await localStorage.getUserId();
    final email = await localStorage.getUserEmail();
    
    setState(() {
      userId = id;
      userEmail = email;
    });
    
    print('ID do usuário logado: $userId');
    print('Email do usuário: $userEmail');
  }

  Future<void> _logout() async {
    try {
      print('Fazendo logout...');
      await localStorage.clearUserData();
      print('Dados limpos do localStorage');
      
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (context) => const LoginPage()),
        (route) => false,
      );
    } catch (e) {
      print('Erro durante logout: $e');
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (context) => const LoginPage()),
        (route) => false,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.black),
            onPressed: _logout,
            tooltip: 'Sair',
          ),
        ],
      ),
      bottomNavigationBar: BottomAppBar(
        color: Colors.white,
        shape: const CircularNotchedRectangle(),
        notchMargin: 6.0,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            // ✅ Ícone de mente (cérebro) - AGORA COM NAVEGAÇÃO
            IconButton(
              icon: const FaIcon(FontAwesomeIcons.brain),
              color: Colors.black,
              onPressed: () {
                // Navega para a tela ParteMental
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const ParteMental()),
                );
              },
            ),

            // Ícone central (Home)
            Container(
              decoration: const BoxDecoration(
                color: Color(0xFF5BA0E0),
                borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
              ),
              padding: const EdgeInsets.all(12),
              child: IconButton(
                icon: const Icon(Icons.home, color: Colors.white),
                onPressed: () {},
              ),
            ),

            // Ícone de halteres (exercício) - COM NAVEGAÇÃO
            IconButton(
              icon: const FaIcon(FontAwesomeIcons.dumbbell),
              color: Colors.black,
              onPressed: () {
                // Navega para a tela ParteFisica
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const ParteFisica()),
                );
              },
            ),
          ],
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 20),
            // Logo e subtítulo
            Center(
              child: Column(
                children: [
                  Image.asset(
                    'assets/logo.jpeg',
                    height: 60,
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'SEU RITMO NOSSA TECNOLOGIA',
                    style: TextStyle(
                      fontSize: 10,
                      color: Colors.black54,
                      letterSpacing: 1,
                    ),
                  ),
                  // Mostrar email do usuário logado
                  if (userEmail != null) ...[
                    const SizedBox(height: 8),
                    Text(
                      'Olá, $userEmail',
                      style: const TextStyle(
                        fontSize: 12,
                        color: Color(0xFF5BA0E0),
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            const SizedBox(height: 40),

            // Texto principal
            const Text(
              'Exercícios físicos feitos hoje: ----',
              style: TextStyle(fontSize: 20, color: Color(0xFF5BA0E0)),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 30),
            const Text(
              'Calorias gastas hoje: ----',
              style: TextStyle(fontSize: 20, color: Color(0xFF5BA0E0)),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 30),
            const Text(
              'Copos de água tomados: 0/15',
              style: TextStyle(fontSize: 20, color: Color(0xFF5BA0E0)),
              textAlign: TextAlign.center,
            ),

            // Espaço para informações adicionais se necessário
            const Spacer(),

            // Botão para ver informações do usuário (opcional)
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: OutlinedButton(
                onPressed: () {
                  _showUserInfo(context);
                },
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: Color(0xFF5BA0E0)),
                ),
                child: const Text(
                  'Ver informações da conta',
                  style: TextStyle(color: Color(0xFF5BA0E0)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showUserInfo(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Informações da Conta'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (userEmail != null) Text('Email: $userEmail'),
            if (userId != null) Text('ID: $userId'),
            const SizedBox(height: 16),
            const Text(
              'Este ID será usado para carregar seus treinos personalizados.',
              style: TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Fechar'),
          ),
        ],
      ),
    );
  }
}