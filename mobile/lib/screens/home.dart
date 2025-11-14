import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'parte_fisica.dart'; // Importe o arquivo onde está a tela ParteFisica

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      bottomNavigationBar: BottomAppBar(
        color: Colors.white,
        shape: const CircularNotchedRectangle(),
        notchMargin: 6.0,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            // Ícone de mente (cérebro)
            IconButton(
              icon: const FaIcon(FontAwesomeIcons.brain),
              color: Colors.black,
              onPressed: () {},
            ),

            // Ícone central (Home)
            Container(
              decoration: const BoxDecoration(
                color: Color(0xFF5BA0E0),
                borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
              ),
              padding: const EdgeInsets.all(12),
              child: IconButton(
                icon: const Icon(Icons.home),
                color: Colors.black,
                onPressed: () {},
              ),
            ),

            // Ícone de halteres (exercício) - AGORA COM NAVEGAÇÃO
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
            const SizedBox(height: 40),
            // Logo e subtítulo
            Center(
              child: Column(
                children: [
                  Image.asset(
                    'assets/logo.jpeg', // substitua pelo caminho do seu logo
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
                ],
              ),
            ),
            const SizedBox(height: 50),

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
          ],
        ),
      ),
    );
  }
}
