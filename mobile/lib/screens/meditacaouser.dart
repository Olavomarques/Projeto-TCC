// screens/meditacoes/meditacaouser.dart
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../services/audio_service.dart';
import '../../services/localStorage.dart'; // ✅ SEU LOCALSTORAGE EXISTENTE

class MeditacaoUser extends StatefulWidget {
  final Map<String, dynamic> meditacao;

  const MeditacaoUser({super.key, required this.meditacao});

  @override
  State<MeditacaoUser> createState() => _MeditacaoUserState();
}

class _MeditacaoUserState extends State<MeditacaoUser> {
  bool _isPlaying = false;
  int _tempoRestante = 0;
  int _tempoTotal = 300;
  bool _meditacaoFinalizada = false;
  bool _musicaCarregada = false;
  double _volume = 0.3;
  
  final AudioService _audioService = AudioService();
  final LocalStorageService _localStorage = LocalStorageService(); // ✅ LOCALSTORAGE

  @override
void initState() {
  super.initState();
  _inicializarTudo();
}

Future<void> _inicializarTudo() async {
  // ✅ USA O TEMPO PERSONALIZADO DA MEDITAÇÃO (em segundos)
  _tempoTotal = widget.meditacao['duracao_segundos'] ?? 
               (widget.meditacao['duracao'] * 60) ?? 
               300; // Fallback 5 minutos
  
  _tempoRestante = _tempoTotal;
  
  _musicaCarregada = await _audioService.inicializarMusica();
  
  if (_musicaCarregada) {
    await _audioService.setVolume(_volume);
  }
  
  print('🎵 Status música: $_musicaCarregada');
  print('⏰ Tempo total: ${_formatTime(_tempoTotal)}');
}

  // ✅ MÉTODO _salvarMeditacaoNoBanco ATUALIZADO - REQUISIÇÃO DIRETA
  Future<void> _salvarMeditacaoNoBanco() async {
    try {
      print('💾 Salvando meditação no banco...');
      
      // ✅ OBTER DADOS DO USUÁRIO
      final userId = await _localStorage.getUserId();
      final token = await _localStorage.getUserToken();
      
      if (userId == null || token == null) {
        print('❌ Usuário não logado');
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Erro: Usuário não logado'),
            backgroundColor: Colors.red,
          ),
        );
        return;
      }

      // ✅ EXTRAIR ID DA MEDITAÇÃO
      final idMeditacao = int.tryParse(widget.meditacao['id']?.toString() ?? '0') ?? 0;
      
      print('🔍 Dados para salvar:');
      print('🔍 User ID: $userId');
      print('🔍 Meditação ID: $idMeditacao');
      print('🔍 Duração: $_tempoTotal segundos');

      // ✅ REQUISIÇÃO DIRETA - IGUAL SUAS OUTRAS TELAS
      final response = await http.post(
        Uri.parse('https://backend-tcc-iota.vercel.app/meduser'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: json.encode({
          'id_user': int.parse(userId),
          'id_meditacao': idMeditacao,
          'duracao': _tempoTotal,
          'data': DateTime.now().toIso8601String(),
        }),
      );

      print('📡 Status da resposta: ${response.statusCode}');
      print('📦 Corpo da resposta: ${response.body}');

      if (response.statusCode == 201) {
        print('✅ Meditação salva com sucesso!');
        
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Meditação de ${_formatTime(_tempoTotal)} salva! ✅'),
            backgroundColor: Colors.green,
            duration: const Duration(seconds: 3),
          ),
        );
      } else {
        print('❌ Erro ao salvar: ${response.statusCode}');
        
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ${response.statusCode}: ${response.body}'),
            backgroundColor: Colors.red,
            duration: const Duration(seconds: 3),
          ),
        );
      }
    } catch (e) {
      print('❌ Erro na requisição: $e');
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Erro de conexão: $e'),
          backgroundColor: Colors.orange,
          duration: const Duration(seconds: 3),
        ),
      );
    }
  }

  // ... (TODO O RESTO DO CÓDIGO PERMANECE IGUAL - métodos _iniciarMeditacao, _pausarMeditacao, etc.)

  void _iniciarMeditacao() async {
    if (_musicaCarregada && !_audioService.isPlaying) {
      await _audioService.toggleMusica();
    }
    
    setState(() {
      _isPlaying = true;
      _meditacaoFinalizada = false;
    });

    _iniciarTimer();
  }

  void _pausarMeditacao() async {
    if (_musicaCarregada && _audioService.isPlaying) {
      await _audioService.toggleMusica();
    }
    
    setState(() {
      _isPlaying = false;
    });
  }

  void _iniciarTimer() {
    Future.delayed(const Duration(seconds: 1), () {
      if (_isPlaying && _tempoRestante > 0 && mounted) {
        setState(() {
          _tempoRestante--;
        });
        _iniciarTimer();
      } else if (_tempoRestante == 0 && _isPlaying && mounted) {
        _finalizarMeditacao();
      }
    });
  }

  void _finalizarMeditacao() async {
    if (_musicaCarregada && _audioService.isPlaying) {
      await _audioService.pararMusica();
    }
    
    setState(() {
      _isPlaying = false;
      _meditacaoFinalizada = true;
    });

    _salvarMeditacaoNoBanco();
  }

  void _reiniciarMeditacao() {
    setState(() {
      _tempoRestante = _tempoTotal;
      _isPlaying = false;
      _meditacaoFinalizada = false;
    });
  }

  

  void _mudarVolume(double novoVolume) async {
    setState(() {
      _volume = novoVolume;
    });
    
    if (_musicaCarregada) {
      await _audioService.setVolume(_volume);
    }
  }

  Icon _getVolumeIcon() {
    if (_volume == 0.0) {
      return const Icon(Icons.volume_off, color: Colors.white70, size: 16);
    } else if (_volume < 0.5) {
      return const Icon(Icons.volume_down, color: Colors.white70, size: 16);
    } else {
      return const Icon(Icons.volume_up, color: Colors.white70, size: 16);
    }
  }

  @override
  void dispose() {
    _audioService.dispose();
    super.dispose();
  }

  String get _titulo => widget.meditacao['titulo']?.toString() ?? 'Meditação Guiada';
  String get _descricao => widget.meditacao['descricaoCompleta']?.toString() ?? 
                          widget.meditacao['descricao']?.toString() ?? 
                          'Relaxe e foque na sua respiração...';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1A1A2E),
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(),
            
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: _buildConteudo(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => Navigator.pop(context),
          ),
          const SizedBox(width: 16),
          const Text(
            'Meditação Guiada',
            style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const Spacer(),
          
          IconButton(
            icon: Icon(
              _audioService.isPlaying ? Icons.music_note : Icons.music_off,
              color: _musicaCarregada ? Colors.green : Colors.grey,
            ),
            onPressed: _musicaCarregada ? _audioService.toggleMusica : null,
            tooltip: _audioService.isPlaying ? 'Pausar música' : 'Tocar música',
          ),
        ],
      ),
    );
  }

  Widget _buildConteudo() {
    if (!_meditacaoFinalizada) {
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          

          Container(
            width: 150,
            height: 150,
            decoration: BoxDecoration(
              color: const Color(0xFF5BA0E0).withOpacity(0.1),
              borderRadius: BorderRadius.circular(75),
              border: Border.all(color: const Color(0xFF5BA0E0), width: 2),
            ),
            child: Icon(
              Icons.self_improvement,
              color: const Color(0xFF5BA0E0),
              size: 60,
            ),
          ),

        Text(_titulo, style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
        const SizedBox(height: 20),
        
        // ✅ MOSTRAR O TEMPO ESCOLHIDO
        Column(
          children: [
Text(_formatTime(_tempoRestante), style: const TextStyle(color: Color(0xFF5BA0E0), fontSize: 48, fontWeight: FontWeight.bold)),            const SizedBox(height: 4),
            Text(
              'Tempo escolhido: ${_tempoTotal ~/ 60} minutos',
              style: const TextStyle(color: Colors.white70, fontSize: 14),
            ),
          ],
        ),
          
          const SizedBox(height: 30),
          Text(_titulo, style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
          const SizedBox(height: 20),
          Text(_formatTime(_tempoRestante), style: const TextStyle(color: Color(0xFF5BA0E0), fontSize: 48, fontWeight: FontWeight.bold)),
          const SizedBox(height: 10),
          LinearProgressIndicator(
            value: _tempoTotal > 0 ? 1 - (_tempoRestante / _tempoTotal) : 0,
            backgroundColor: Colors.white30,
            color: const Color(0xFF5BA0E0),
            minHeight: 6,
          ),
          const SizedBox(height: 30),
           Expanded(
          child: SingleChildScrollView(
            child: Text(
              _descricao,
              style: const TextStyle(color: Colors.white70, fontSize: 16, height: 1.5),
              textAlign: TextAlign.center,
            ),
          ),
        ),
        const SizedBox(height: 30),
        
        _buildControles(),
        _buildIndicadorMusica(),
      ],
      );
    } else {
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.check_circle, color: Colors.green, size: 80),
          const SizedBox(height: 20),
          Text('Meditação Finalizada!', style: const TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)),
          const SizedBox(height: 10),
          Text('Você meditou por ${_formatTime(_tempoTotal)}', style: const TextStyle(color: Colors.white70, fontSize: 16)),
          const SizedBox(height: 30),
          ElevatedButton.icon(
            onPressed: _reiniciarMeditacao,
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF5BA0E0),
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            ),
            icon: const Icon(Icons.replay, color: Colors.white),
            label: const Text('Nova Meditação', style: TextStyle(color: Colors.white)),
          ),
          _buildIndicadorMusica(),
        ],
      );
    }
  }



  Widget _buildControles() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (_isPlaying) ...[
          ElevatedButton.icon(
            onPressed: _pausarMeditacao,
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.orange,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            ),
            icon: const Icon(Icons.pause, color: Colors.white),
            label: const Text('Pausar', style: TextStyle(color: Colors.white)),
          ),
        ] else ...[
          ElevatedButton.icon(
            onPressed: _tempoRestante > 0 ? _iniciarMeditacao : _reiniciarMeditacao,
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF5BA0E0),
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            ),
            icon: Icon(_tempoRestante == _tempoTotal ? Icons.play_arrow : Icons.replay, color: Colors.white),
            label: Text(_tempoRestante == _tempoTotal ? 'Iniciar' : 'Reiniciar', style: const TextStyle(color: Colors.white)),
          ),
        ],
        
        const SizedBox(width: 16),
        
        ElevatedButton.icon(
          onPressed: _finalizarMeditacao,
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          ),
          icon: const Icon(Icons.stop, color: Colors.white),
          label: const Text('Finalizar', style: TextStyle(color: Colors.white)),
        ),
      ],
    );
  }

  Widget _buildIndicadorMusica() {
    return Column(
      children: [
        const SizedBox(height: 20),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              _musicaCarregada ? Icons.music_note : Icons.music_off,
              color: _musicaCarregada ? 
                (_audioService.isPlaying ? Colors.green : Colors.orange) 
                : Colors.grey,
              size: 16,
            ),
            const SizedBox(width: 8),
            Text(
              _musicaCarregada ? 
                '${_audioService.currentMusicName} - ${_audioService.isPlaying ? 'Tocando' : 'Pausada'}' 
                : 'Música não disponível',
              style: TextStyle(
                color: _musicaCarregada ? 
                  (_audioService.isPlaying ? Colors.green : Colors.orange) 
                  : Colors.grey,
                fontSize: 12,
              ),
            ),
          ],
        ),
        
        if (_musicaCarregada && _audioService.isPlaying) ...[
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _getVolumeIcon(),
              const SizedBox(width: 8),
              Text(
                'Volume: ${(_volume * 100).round()}%',
                style: const TextStyle(color: Colors.white70, fontSize: 12),
              ),
            ],
          ),
          SizedBox(
            width: 200,
            child: Slider(
              value: _volume,
              min: 0.0,
              max: 1.0,
              divisions: 10,
              onChanged: _mudarVolume,
              activeColor: const Color(0xFF5BA0E0),
              inactiveColor: Colors.white30,
            ),
          ),
        ],
      ],
    );
  }

  String _formatTime(int seconds) {
    int minutes = (seconds / 60).floor();
    int remainingSeconds = seconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${remainingSeconds.toString().padLeft(2, '0')}';
  }
}