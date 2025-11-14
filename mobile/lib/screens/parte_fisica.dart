import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'home.dart'; // Importe o arquivo da tela Home

class ParteFisica extends StatelessWidget {
  const ParteFisica({super.key});

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

            // Espaço vazio para o botão central flutuante
            const SizedBox(width: 40),

            // Ícone de halteres (exercício)
            IconButton(
              icon: const FaIcon(FontAwesomeIcons.dumbbell),
              color: Colors.black,
              onPressed: () {},
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFF5BA0E0),
        onPressed: () {
          // Navega de volta para a tela Home
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => const HomePage()),
          );
        },
        child: const Icon(Icons.home, color: Colors.white),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 40),
            // Logo e subtítulo
            Center(
              child: Column(
                children: [
                  Container(
                    width: 60,
                    height: 60,
                    decoration: BoxDecoration(
                      color: const Color(0xFF5BA0E0),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(
                      Icons.fitness_center,
                      color: Colors.white,
                      size: 35,
                    ),
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

            // Grid de funcionalidades (AGORA COM 3 CARDS)
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: GridView.count(
                  crossAxisCount: 2,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 1.1,
                  children: [
                    // Card 1 - Meus Treinos
                    _buildFeatureCard(
                      icon: FontAwesomeIcons.dumbbell,
                      title: 'MEUS TREINOS',
                      subtitle: 'Acesse seus treinos personalizados',
                      color: const Color(0xFFE74C3C),
                      onTap: () {
                        // Navegar para tela de meus treinos
                      },
                    ),

                    // Card 2 - Criar Novo Treino
                    _buildFeatureCard(
                      icon: FontAwesomeIcons.plus,
                      title: 'CRIAR TREINO',
                      subtitle: 'Desenvolva um novo plano',
                      color: const Color(0xFF2ECC71),
                      onTap: () {
                        // Navegar para tela de criar treino
                      },
                    ),

                    // Card 3 - Ver Exercícios
                    _buildFeatureCard(
                      icon: FontAwesomeIcons.list,
                      title: 'EXERCÍCIOS',
                      subtitle: 'Biblioteca de exercícios',
                      color: const Color(0xFFF39C12),
                      onTap: () {
                        // Navegar para tela de exercícios
                      },
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 30),
          ],
        ),
      ),
    );
  }

  Widget _buildFeatureCard({
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: color,
                  borderRadius: BorderRadius.circular(25),
                ),
                child: Icon(icon, color: Colors.white, size: 24),
              ),
              const SizedBox(height: 12),
              Text(
                title,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                style: const TextStyle(fontSize: 10, color: Colors.black54),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
