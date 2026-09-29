# GridWave

**Crie batidas direto no navegador.** GridWave é uma drum machine em português do Brasil, feita com JavaScript moderno e Web Audio API. Monte padrões, ajuste o mixer e grave suas ideias sem instalar dependências.

> Sons Profissionais • Web Audio API

## Visão geral

- Sequenciador de 8 trilhas por 16 passos, com edição por clique, arraste e toque.
- Síntese de bateria em tempo real: kick, snare, clap, chimbal fechado e aberto, tom, tom grave e crash.
- Três kits sintetizados: 808 Classic, 909 Techno e Linn Lo-Fi.
- Mixer por canal com volume, panorama, mute, solo e medidor de nível.
- BPM ajustável de 60 a 220, swing, volume master e randomização de padrões.
- Gravação da saída master em um formato de áudio compatível com o navegador.
- Padrão de demonstração e salvamento automático no armazenamento local do navegador.
- Atalhos: `Espaço` para tocar/pausar, `C` para limpar e `R` para gravar.
- Interface adaptável para telas menores.

## Captura de tela

Abra `index.html` por um servidor local para ver a interface e liberar o áudio pelo primeiro clique.

## Começar

O projeto não usa framework, bundler ou bibliotecas externas. É necessário servir os arquivos por HTTP, pois módulos ES não funcionam ao abrir `index.html` diretamente com `file://`.

### Python

```bash
python -m http.server 8000
```

### Node.js

```bash
npx serve .
```

Depois, acesse [http://localhost:8000](http://localhost:8000). O navegador pode pedir uma interação antes de iniciar o áudio; pressione **PLAY** ou clique em um controle.

## Publicar

### Vercel

Importe o repositório na Vercel e configure como site estático:

- Framework Preset: **Other**
- Build Command: deixe vazio
- Output Directory: `.` (ou a pasta do projeto, se o repositório contiver mais arquivos)

### GitHub Pages

Publique o conteúdo desta pasta na branch e diretório configurados em **Settings → Pages**. Como não há etapa de build, basta servir `index.html` e as pastas `css/` e `js/` na mesma raiz.

## Estrutura

```text
gridwave/
├── index.html
├── css/                  # Tokens visuais e estilos por área
└── js/
    ├── main.js           # Composição e injeção das dependências
    ├── audio/            # Motor, instrumentos, canais e kits
    ├── config/           # Trilhas e constantes
    ├── core/             # EventBus
    ├── mixer/            # Regras de mute e solo
    ├── recording/        # Gravação de áudio
    ├── sequencer/        # Padrão, scheduler e transporte
    ├── storage/          # Adaptador de persistência local
    └── ui/                # Views e controles de interface
```

## Arquitetura

O projeto usa ES Modules nativos e separa áudio, estado, reprodução, persistência e interface. `main.js` é o composition root: instancia as implementações concretas e injeta suas dependências. `Pattern` guarda apenas o grid; `Scheduler` agenda eventos com lookahead pelo relógio do `AudioContext`; `Transport` controla play, pause, stop e BPM. As Views trabalham com callbacks e não criam nem sintetizam áudio.

Os instrumentos implementam o contrato `play(time, params, destination)`. Os kits fornecem `getParams(trackId)`. `MixerState` concentra a regra de prioridade do solo. A persistência usa `StorageAdapter`, com `LocalStorageAdapter` como implementação atual.

## Adicionar um kit

Crie `js/audio/kits/KitDust.js`:

```js
export default class KitDust {
  getParams(trackId) {
    return {
      kick: { freq: 135 },
      snare: { filter: 1000, body: 165 },
      chh: { filter: 6000 }
    }[trackId] || {};
  }
}
```

Registre o kit no mapa de `js/audio/KitRegistry.js` e inclua sua opção no seletor em `js/ui/TopBarView.js`. A interface do kit mantém a agenda e o motor de áudio independentes de seus parâmetros específicos.

## Adicionar um instrumento

Crie um arquivo em `js/audio/instruments/`, estenda `Instrument` e implemente `play(time, params, destination)`. Por exemplo, um rimshot pode combinar um oscilador breve e ruído filtrado. Em seguida, registre sua instância no composition root `js/main.js` e inclua a trilha em `js/config/tracks.js`. O instrumento recebe tempo de áudio e destino do canal; não precisa conhecer a interface.

## Tecnologias

- HTML e CSS
- JavaScript ES Modules
- Web Audio API e MediaRecorder API
- [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)

## Licença

Nenhuma licença foi especificada. Adicione um arquivo `LICENSE` antes de redistribuir o projeto sob termos próprios.
