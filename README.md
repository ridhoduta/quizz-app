# English Placement Test

Aplikasi web placement test berbasis React untuk menguji kemampuan bahasa Inggris peserta. Aplikasi ini menyediakan alur lengkap mulai dari pengisian biodata, pengerjaan soal dengan timer, kalkulasi skor & level, rekomendasi program, hingga konsultasi via WhatsApp.

| Field              | Detail                                       |
| ------------------ | -------------------------------------------- |
| **Nama Aplikasi**  | BunnySpeak Course                       |
| **Deskripsi**      | Multi-step placement test engine untuk pengukuran kemampuan bahasa Inggris |
| **Developer**      | Ridho Duta Yuwana                                       |
| **Teknologi**      | React 19, Vite 8, Tailwind CSS 4, React Router 7 |
| **URL**            | https://quizz-app-delta-five.vercel.app/     |
| **Repository**     | https://github.com/ridho/quiz-app            |

---

## Daftar Isi

- [Features](#features)
- [Design System](#design-system)
- [Tech Stack](#tech-stack)
- [Frontend Architecture](#frontend-architecture)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [State Management](#state-management)
- [Authentication](#authentication)
- [Responsive Design](#responsive-design)
- [Error Handling](#error-handling)
- [Environment Configuration](#environment-configuration)
- [Testing](#testing)
- [Installation Guide](#installation-guide)
- [Conclusion](#conclusion)

---

## Features

### 1. Landing Page
Halaman utama yang menampilkan hero section, penjelasan program, langkah-langkah pengerjaan, dan CTA untuk memulai placement test.

### 2. Biodata Form
Formulir pengisian data diri peserta dengan 5 field:
- Nama lengkap
- Email
- Nomor WhatsApp
- Domisili (kota)
- Target program (Beginner / Intermediate / Advanced)

Setiap field memiliki validasi real-time dan error message yang informatif.

### 3. Quiz Info Page
Halaman informasi sebelum memulai tes yang menjelaskan:
- Jumlah soal (15)
- Waktu pengerjaan (10 menit)
- Aturan navigasi
- Ketentuan auto-submit

### 4. Quiz Engine
Mesin kuis interaktif dengan fitur:
- 15 soal pilihan ganda (grammar, vocabulary, reading comprehension)
- Timer global 10 menit dengan 3 urgency level (normal / warning / critical)
- Auto-save jawaban ke localStorage setiap kali memilih
- Navigasi bebas antar nomor soal
- Progress bar real-time
- Konfirmasi sebelum submit
- Auto-submit ketika waktu habis

### 5. Result Page
Halaman hasil yang menampilkan:
- Skor (0-100%)
- Level (Beginner / Intermediate / Advanced)
- Rekomendasi program belajar
- Review semua soal & jawaban (benar/salah)
- CTA WhatsApp untuk konsultasi

### 6. WhatsApp Integration
Generates pesan WhatsApp otomatis berdasarkan hasil test, termasuk data diri, skor, level, dan program rekomendasi. Pesan terkirim ke nomor admin yang telah dikonfigurasi.

### 7. Route Guards
Perlindungan halaman berdasarkan session:
- `/quiz` dan `/info` hanya bisa diakses jika biodata session ada
- `/result` hanya bisa diakses jika quiz result ada
- Akses langsung ke URL yang dilindungi akan di-redirect ke halaman yang sesuai

### 8. 404 Not Found
Halaman fallback untuk route yang tidak dikenal.

---

## Design System

### Color Palette

| Token                | Hex       | Penggunaan                            |
| -------------------- | --------- | ------------------------------------- |
| Primary              | `#012C64` | Heading, brand elements               |
| Primary Container    | `#22437C` | Buttons, navigation, progress         |
| Primary Container Hover | `#1A3462` | Hover state button primary         |
| Brand Accent         | `#A9213F` | Primary CTA, important actions        |
| Brand Accent Deep    | `#8A1A32` | Hover state CTA                       |
| Background           | `#FEFCFF` | Halaman utama                         |
| Surface              | `#F9F9FF` | Card, elevated surface                |
| Surface Container Lowest | `#FFFFFF` | Card putih, modal                 |
| Surface Container Low | `#F0F3FF` | Subtle background                     |
| Surface Container High | `#E2E8F8` | Badge, tag                          |
| Surface Variant      | `#DCE2F3` | Border, divider                       |
| On Surface           | `#151C27` | Teks utama                            |
| On Surface Variant   | `#434750` | Teks sekunder, deskripsi              |
| Outline              | `#747781` | Border default                        |
| Outline Variant      | `#C4C6D1` | Border subtle                         |
| Error                | `#BA1A1A` | Error state                           |
| Error Container      | `#FFDAD6` | Error background                      |
| Hero                 | `#193566` | Hero section background               |
| Gold                 | `#FFD166` | Highlight, badge                      |
| Quiz Background      | `#F1F4FB` | Quiz page background                  |

### Typography

| Element     | Size          | Weight    | Penggunaan                |
| ----------- | ------------- | --------- | ------------------------- |
| H1          | 32-40px       | Bold      | Page title                |
| H2          | 22-28px       | Bold      | Section heading           |
| H3          | 16-20px       | Semibold  | Card heading              |
| Body        | 14-16px       | Regular   | Deskripsi, konten         |
| Caption     | 12-14px       | Regular   | Label, helper text        |
| Badge       | 12-14px       | Bold      | Tag, status indicator     |

### Spacing

| Token   | Value |
| ------- | ----- |
| xs      | 4px   |
| sm      | 8px   |
| md      | 16px  |
| lg      | 24px  |
| xl      | 32px  |
| 2xl     | 48px  |

### Border Radius

| Element       | Radius  |
| ------------- | ------- |
| Button/Input  | 8px     |
| Card          | 12px    |
| Large Card    | 16px    |
| Badge         | 999px   |

### Shadow

| Token      | Value                                        |
| ---------- | -------------------------------------------- |
| Custom     | `0px 2px 4px rgba(34, 67, 124, 0.05)`        |
| Card       | `0px 2px 8px rgba(34, 67, 124, 0.08)`        |
| Ambient    | `0px 4px 12px rgba(34, 67, 124, 0.06)`       |
| Hover      | `0px 8px 24px rgba(34, 67, 124, 0.12)` + `translateY(-2px)` |

### Icon
Menggunakan [Material Symbols Outlined](https://fonts.google.com/icons) dari Google Fonts dengan 2 variants:
- Default (outline)
- Filled

### Button Variants

| Variant   | Style                                                  |
| --------- | ------------------------------------------------------ |
| Primary   | `bg-primary-container text-white`, hover darker        |
| Accent    | `bg-brand-accent text-white`, hover `brand-accent-deep`|
| Secondary | `bg-surface-container-low text-primary-container`, border |
| Disabled  | `opacity-50 cursor-not-allowed`                        |

### Reusable Components

| Component       | Fungsi                                             |
| --------------- | -------------------------------------------------- |
| Button          | Tombol dengan variant primary, accent, secondary   |
| Input           | Form input dengan label, error, helper text        |
| ProgressBar     | Indikator progress bar                             |
| Loading         | Loading spinner / skeleton                         |
| ErrorMessage    | Pesan error yang informatif                        |

---

## Tech Stack

| Teknologi          | Versi  | Fungsi                                           |
| ------------------ | ------ | ------------------------------------------------ |
| React              | 19.2   | UI library, component-based architecture         |
| Vite               | 8.2    | Build tool, dev server, HMR                      |
| Tailwind CSS       | 4.3    | Utility-first CSS framework                      |
| React Router       | 7.18   | Client-side routing, route guards                |
| @tailwindcss/vite  | 4.3    | Tailwind CSS plugin untuk Vite                   |
| ESLint             | 10.9   | Code linting, code quality                       |
| @vitejs/plugin-react | 6.1  | React Fast Refresh untuk Vite                    |

### Browser APIs
- **localStorage** — Persistensi data session, jawaban, progress, hasil, dan timer
- **URL API** — WhatsApp deep link generation

---

## Frontend Architecture

### Architecture Diagram

```
┌───────────────────────────────────────────────────┐
│                   React App                       │
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │              React Router                   │  │
│  │  /  /biodata  /info  /quiz  /result  *      │  │
│  └───────────────────┬─────────────────────────┘  │
│                      │                            │
│       ┌──────────────┼──────────────┐             │
│       │              │              │             │
│       ▼              ▼              ▼             │
│  LandingPage    QuizPage      ResultPage          │
│  BiodataPage    QuizInfoPage  Notfound            │
│       │              │              │             │
│       ▼              ▼              ▼             │
│  Section        Quiz           Result              │
│  Components     Components     Components          │
│       │              │              │             │
│       └──────┬───────┴──────┬───────┘             │
│              ▼              ▼                     │
│           Hooks          Common                   │
│       ┌─────┴─────┐   Components                  │
│       │           │                              │
│   useBiodata   useQuiz                           │
│   usePrograms  useTimer                          │
│       │           │                              │
│       └─────┬─────┘                              │
│             ▼                                    │
│           Utils                                  │
│    ┌────┬─────┬────────┐                         │
│    │    │     │        │                         │
│  Valid  Quiz  Recom-  WhatsApp                   │
│  ation  Calc  mend                              │
│    │    │     │        │                         │
│    └────┴─────┴────────┘                         │
│             │                                    │
│             ▼                                    │
│      Data / Storage                              │
│    ┌────┴──────────┐                             │
│    │               │                             │
│  JSON Data    localStorage                      │
│  (questions,  (session, answers,                 │
│   programs)    progress, result, timer)          │
└───────────────────────────────────────────────────┘
```

### Separation of Concerns

| Layer        | Responsibility                                  |
| ------------ | ----------------------------------------------- |
| Pages        | Layout composition, page-level state            |
| Components   | Reusable UI, presentation                       |
| Hooks        | React state, lifecycle, business logic          |
| Utils        | Pure functions, data processing                 |
| Data         | Static JSON (questions, programs)               |
| Storage      | localStorage abstraction (persistence)          |

### Data Flow

```
User Input
    ↓
Form Component
    ↓
useBiodata Hook
    ↓
validation.js
    ↓
storage.js → localStorage
    ↓
Navigation (React Router)
    ↓
QuizPage
    ↓
useQuiz Hook
    ↓
questions.json
    ↓
selectAnswer() → storage.setQuizAnswers()
    ↓
submitQuiz()
    ↓
quizCalculator.js → calculateScore() → determineLevel()
    ↓
recommendation.js → getRecommendation()
    ↓
storage.setQuizResult()
    ↓
ResultPage
    ↓
whatsapp.js → generateWhatsAppUrl()
```

---

## Project Structure

```
quiz-app/
├── public/                          # Static assets
├── reference/                       # HTML reference designs
│   ├── landing.html
│   ├── biodata.html
│   ├── biodatav2.html
│   ├── quiz.html
│   ├── modal-confirm.html
│   ├── result.html
│   └── notfound.html
├── src/
│   ├── assets/                      # Images, fonts, static files
│   │   └── images/
│   ├── components/
│   │   ├── common/                  # Reusable UI components
│   │   │   ├── Button.jsx           # Button dengan variant
│   │   │   ├── Input.jsx            # Form input dengan validasi
│   │   │   ├── ProgressBar.jsx      # Indikator progress
│   │   │   ├── Loading.jsx          # Loading spinner
│   │   │   └── ErrorMessage.jsx     # Error message display
│   │   ├── quiz/                    # Quiz-specific components
│   │   │   ├── QuestionCard.jsx     # Container soal
│   │   │   ├── OptionButton.jsx     # Tombol pilihan jawaban
│   │   │   ├── QuestionNavigation.jsx # Navigasi antar soal
│   │   │   ├── QuestionTimer.jsx    # Timer display
│   │   │   └── SubmitConfirmation.jsx # Modal konfirmasi submit
│   │   ├── result/                  # Result-specific components
│   │   │   ├── ResultCard.jsx       # Card skor & level
│   │   │   ├── RecommendationCard.jsx # Card rekomendasi program
│   │   │   ├── WhatsAppButton.jsx   # Tombol CTA WhatsApp
│   │   │   └── QuestionReviewList.jsx # Review semua soal
│   │   └── section/                 # Landing page sections
│   │       ├── Header.jsx           # Header aplikasi
│   │       ├── Navbar.jsx           # Navigasi
│   │       ├── HeroSection.jsx      # Hero landing page
│   │       ├── ProgramsSection.jsx  # Daftar program
│   │       ├── StepsSection.jsx     # Langkah pengerjaan
│   │       ├── CtaSection.jsx       # Call to action
│   │       ├── Footer.jsx           # Footer
│   │       ├── Footerv2.jsx         # Footer variant
│   │       └── index.js             # Section barrel export
│   ├── config/
│   │   └── env.js                   # Environment variable config
│   ├── constants/
│   │   └── index.js                 # App constants (timer, storage keys)
│   ├── data/
│   │   ├── questions.json           # 15 soal placement test
│   │   └── programs.json            # 3 program rekomendasi
│   ├── hooks/
│   │   ├── useBiodata.js            # Biodata form state & validation
│   │   ├── useQuiz.js               # Quiz state, navigation, submit
│   │   ├── useTimer.js              # Countdown timer dengan urgency
│   │   └── usePrograms.js           # Program data & enrichment
│   ├── lib/
│   │   └── storage.js               # localStorage abstraction
│   ├── pages/
│   │   ├── LandingPage.jsx          # Halaman utama + biodata form
│   │   ├── BiodataPage.jsx          # Form biodata terpisah
│   │   ├── QuizInfoPage.jsx         # Info sebelum mulai tes
│   │   ├── QuizPage.jsx             # Halaman pengerjaan kuis
│   │   ├── ResultPage.jsx           # Halaman hasil
│   │   └── Notfound.jsx             # 404 page
│   ├── routes/
│   │   └── AppRoutes.jsx            # Routing & route guards
│   ├── utils/
│   │   ├── validation.js            # Validasi biodata
│   │   ├── quizCalculator.js        # Kalkulasi skor & level
│   │   ├── recommendation.js        # Rekomendasi program
│   │   └── whatsapp.js              # WhatsApp message & URL
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles & design tokens
├── .gitignore
├── eslint.config.js
├── index.html                       # HTML entry point
├── package.json
├── package-lock.json
└── vite.config.js                   # Vite configuration
```

### Folder Descriptions

| Folder         | Fungsi                                                        |
| -------------- | ------------------------------------------------------------- |
| `components/`  | Komponen UI reusable, dipisah berdasarkan domain (common, quiz, result, section) |
| `pages/`       | Komponen halaman, masing-masing merepresentasikan satu route |
| `hooks/`       | Custom hooks untuk state management dan business logic        |
| `utils/`       | Pure functions tanpa React dependency                        |
| `data/`        | Data statis dalam format JSON                                 |
| `lib/`         | Abstraction layer untuk browser APIs (localStorage)           |
| `config/`      | Konfigurasi environment variables                             |
| `constants/`   | Konstanta aplikasi (timer defaults, storage keys)             |
| `routes/`      | Definisi routing dan route guards                             |
| `assets/`      | Gambar, font, dan file statis lainnya                         |

---

## Routing

### Route Table

| Route      | Component       | Access       | Fungsi                              |
| ---------- | --------------- | ------------ | ----------------------------------- |
| `/`        | LandingPage     | Public       | Halaman utama + biodata form        |
| `/biodata` | BiodataPage     | Public       | Form biodata terpisah               |
| `/info`    | QuizInfoPage    | Protected*   | Informasi sebelum memulai tes       |
| `/quiz`    | QuizPage        | Protected*   | Halaman pengerjaan kuis             |
| `/result`  | ResultPage      | Protected**  | Halaman hasil placement test        |
| `*`        | NotFound        | Public       | 404 page                            |

### Route Guards

**QuizRouteGuard** (`/info`, `/quiz`):
- Mengecek apakah `userSession` ada di localStorage
- Jika tidak ada → redirect ke `/`
- Jika ada → render children

**ResultRouteGuard** (`/result`):
- Mengecek apakah `quizResult` ada di localStorage
- Jika tidak ada → redirect ke `/quiz`
- Jika ada → render children

### Navigation Flow

```
LandingPage (/)
    ↓ submit biodata
QuizInfoPage (/info) ← guarded by QuizRouteGuard
    ↓ mulai tes
QuizPage (/quiz) ← guarded by QuizRouteGuard
    ↓ submit jawaban
ResultPage (/result) ← guarded by ResultRouteGuard
    ↓ WhatsApp CTA
External WhatsApp link
```

---

## State Management

Aplikasi menggunakan **React built-in hooks** (`useState`, `useEffect`, `useCallback`, `useMemo`) untuk state management. Tidak menggunakan state management library eksternal.

### State Architecture

```
┌─────────────────────────────────────────────────┐
│                  React State                    │
│                                                 │
│  useBiodata          useQuiz                    │
│  ├── biodata         ├── currentIndex           │
│  ├── errors          ├── answers                │
│  └── isLoaded        ├── quizResult             │
│                      ├── isLoaded               │
│  useTimer            └── progress               │
│  ├── timeLeft                                    │
│  ├── urgency          usePrograms               │
│  └── formattedTime    ├── programs              │
│                       ├── enrichedPrograms      │
│                       └── programOptions        │
└────────────────────────┬────────────────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │     localStorage    │
              │                     │
              │  ├── userSession    │
              │  ├── quizAnswers    │
              │  ├── quizProgress   │
              │  ├── quizResult     │
              │  └── quizTimer      │
              └─────────────────────┘
```

### Hook Responsibilities

| Hook         | State Yang Dikelola                                 | Fungsi Utama                                        |
| ------------ | --------------------------------------------------- | --------------------------------------------------- |
| `useBiodata` | biodata, errors                                     | updateField, saveBiodata, resetBiodata              |
| `useQuiz`    | currentIndex, answers, quizResult, progress, isLoaded | selectAnswer, nextQuestion, previousQuestion, goToQuestion, submitQuiz, resetQuiz |
| `useTimer`   | timeLeft, urgency, formattedTime                    | countdown, resetTimer, formatTime                   |
| `usePrograms`| programs, enrichedPrograms, programOptions           | getProgramById, getProgramByLevel, getProgramByTitle|

### Auto-Save Flow

```
User selects answer
    ↓
selectAnswer(questionId, optionIndex)
    ↓
setAnswers() → state updated
    ↓
storage.setQuizAnswers(answers) → localStorage
    ↓
storage.setQuizProgress(progress) → localStorage
    ↓
Progress bar UI re-renders
```

---

## Authentication

Aplikasi ini tidak memiliki sistem autentikasi tradisional (login/logout dengan credentials). Sebagai penggantinya, aplikasi menggunakan **session-based routing** dengan localStorage.

### Session Management

| Session Key     | Data Yang Disimpan                  | Lifetime              |
| --------------- | ----------------------------------- | --------------------- |
| `userSession`   | Biodata peserta (nama, email, WA, domisili, program) | Sampai browser clear |
| `quizAnswers`   | Jawaban soal `{ questionId: optionIndex }` | Sampai quiz submit |
| `quizProgress`  | Persentase progress (0-100)         | Sampai quiz submit    |
| `quizResult`    | Hasil akhir (skor, level, rekomendasi) | Sampai browser clear |
| `quizTimer`     | Sisa waktu dalam detik              | Sampai quiz submit    |

### Session Lifecycle

```
1. User mengisi biodata
   → storage.setUserSession(biodata)

2. User mulai quiz
   → storage.getQuizAnswers() → restore jawaban sebelumnya (jika refresh)
   → storage.getQuizTimer() → restore timer

3. User menjawab soal
   → storage.setQuizAnswers() → auto-save
   → storage.setQuizProgress() → auto-save

4. User submit quiz
   → storage.setQuizResult() → simpan hasil
   → storage.clearQuizSession() → hapus answers, progress, timer

5. User melihat result
   → storage.getQuizResult() → tampilkan hasil

6. User clear browser / logout
   → storage.clearAll() → hapus semua session
```

### Protected Routes

```javascript
// QuizRouteGuard
const checkQuizSessionValid = () => {
  const session = storage.getUserSession();
  if (!session) return false;
  const parsed = JSON.parse(session);
  return Boolean(parsed && parsed.name);
};

// ResultRouteGuard
const checkResultSessionValid = () => {
  const result = storage.getQuizResult();
  if (!result) return false;
  const parsed = JSON.parse(result);
  return Boolean(parsed && parsed.score !== undefined);
};
```

---

## Responsive Design

### Breakpoints

| Breakpoint | Width     | Layout                                    |
| ---------- | --------- | ----------------------------------------- |
| Mobile     | < 640px   | Single column, stacked layout             |
| Tablet     | 640-1024px| Adjusted spacing, partial side-by-side    |
| Desktop    | > 1024px  | Multi-column, sidebar navigation          |

### Mobile First Approach

Semua komponen dibangun dari layout mobile terlebih dahulu, kemudian diperluas menggunakan Tailwind CSS responsive prefix (`sm:`, `md:`, `lg:`, `xl:`).

### Layout Changes by Screen Size

| Komponen        | Mobile                              | Desktop                              |
| --------------- | ----------------------------------- | ------------------------------------ |
| Header          | Hamburger menu, compact logo        | Full navigation bar                  |
| Hero Section    | Stacked layout, full-width CTA      | Side-by-side, contained width        |
| Biodata Form    | Full-width inputs, stacked          | Grid layout, side-by-side            |
| Quiz            | Bottom navigation, scrollable       | Sidebar navigation, fixed layout     |
| Question Number | Horizontal scroll                    | Grid sidebar                         |
| Timer           | Compact display                     | Full display dengan urgency label    |
| Result          | Stacked cards                       | Side-by-side layout                  |
| WhatsApp Button | Full-width CTA                      | Contained width                      |

### Page Padding

| Screen   | Padding |
| -------- | ------- |
| Mobile   | 16px    |
| Tablet   | 20-24px |
| Desktop  | 24-32px |

### Touch Targets

Semua elemen interaktif (button, option, navigation) memiliki minimum touch target 44x44px untuk kenyamanan pengguna mobile.

---

## Error Handling

### 1. Form Validation Error

```javascript
// validation.js
const errors = {};

if (!name) {
  errors.name = 'Nama lengkap wajib diisi.';
} else if (name.length < 2) {
  errors.name = 'Nama minimal 2 karakter.';
}

if (!email) {
  errors.email = 'Alamat email wajib diisi.';
} else if (!validateEmail(email)) {
  errors.email = 'Format alamat email tidak valid.';
}
```

**UI Response**: Error message ditampilkan di bawah field yang bermasalah dengan warna merah.

### 2. localStorage Error

```javascript
// Semua operasi storage dibungkus try-catch
try {
  storage.setQuizAnswers(updated);
} catch (err) {
  console.error('Failed to auto-save quiz answers to storage:', err);
}
```

### 3. Corrupt localStorage Data

```javascript
// useQuiz.js
try {
  const savedAnswers = storage.getQuizAnswers();
  if (savedAnswers) {
    const parsed = JSON.parse(savedAnswers);
    if (parsed && typeof parsed === 'object') {
      setAnswers(parsed);
    }
  }
} catch (err) {
  console.error('Failed to restore quiz state from storage:', err);
}
```

### 4. Invalid Route / 404

```jsx
// AppRoutes.jsx
<Route path="*" element={<NotFound />} />
```

**UI Response**: Halaman 404 dengan pesan informatif dan tombol kembali ke home.

### 5. Empty Data Handling

```javascript
// quizCalculator.js
if (!Array.isArray(questions) || questions.length === 0) {
  return { correctCount: 0, totalQuestions: 0, score: 0 };
}
```

### 6. No Recommendation Found

```javascript
// recommendation.js
// Fallback ke program pertama jika tidak ada match
return matchedProgram || programs[0];
```

### 7. WhatsApp URL Error

```javascript
// whatsapp.js
// Phone number fallback ke default admin
let cleaned = String(phoneNumber).replace(/[^0-9]/g, '');
if (cleaned.startsWith('0')) {
  cleaned = '62' + cleaned.slice(1);
}
```

---

## Environment Configuration

### File `.env`

```
# Storage Keys (optional - defaults to constants/index.js)
VITE_USER_SESSION_KEY=userSession
VITE_QUIZ_ANSWERS_KEY=quizAnswers
VITE_QUIZ_PROGRESS_KEY=quizProgress
VITE_QUIZ_RESULT_KEY=quizResult
VITE_QUIZ_TIMER_KEY=quizTimeLeft
```

### Configuration Architecture

```
.env (environment variables)
    ↓
config/env.js (reads import.meta.env)
    ↓
constants/index.js (default values)
    ↓
lib/storage.js (uses env keys)
    ↓
hooks (useBiodata, useQuiz, useTimer)
```

### Default Values

Jika environment variable tidak diset, aplikasi menggunakan default values dari `constants/index.js`:

```javascript
export const STORAGE_KEYS = {
  USER_SESSION: 'userSession',
  QUIZ_ANSWERS: 'quizAnswers',
  QUIZ_PROGRESS: 'quizProgress',
  QUIZ_RESULT: 'quizResult',
  QUIZ_TIMER: 'quizTimeLeft',
};

export const TIMER = {
  DEFAULT_TIME: 600, // 10 menit dalam detik
};
```

### Catatan Penting

- Tidak ada secrets atau API keys yang di-hardcode
- Semua konfigurasi bisa di-override melalui `.env`
- File `.env` sudah masuk `.gitignore` sehingga tidak ter-commit
- Untuk production, buat `.env.production` dengan values yang sesuai

---

## Testing

### Manual Testing

#### Test Case 1: Biodata Form Validation

| Step | Action                          | Expected Result                          | Status |
| ---- | ------------------------------- | ---------------------------------------- | ------ |
| 1    | Klik "Mulai Tes" tanpa isi form | Semua field menampilkan error            | succees   |
| 2    | Isi nama dengan 1 karakter      | Error: "Nama minimal 2 karakter"         | succees   |
| 3    | Isi email format salah          | Error: "Format alamat email tidak valid" | succees   |
| 4    | Isi WhatsApp format salah       | Error: "Nomor WhatsApp tidak valid"      | succees   |
| 5    | Isi semua field dengan benar    | Tidak ada error, lanjut ke info page     | succees   |

#### Test Case 2: Quiz Functionality

| Step | Action                          | Expected Result                          | Status |
| ---- | ------------------------------- | ---------------------------------------- | ------ |
| 1    | Buka quiz page tanpa session    | Redirect ke landing page                 | succees   |
| 2    | Pilih jawaban soal 1            | Jawaban tersimpan, progress bar naik     | succees   |
| 3    | Klik nomor soal berikutnya      | Soal berikutnya ditampilkan              | succees   |
| 4    | Klik nomor soal sebelumnya      | Soal sebelumnya ditampilkan              | succees   |
| 5    | Klik nomor soal di sidebar      | Soal yang dipilih ditampilkan            | succees   |
| 6    | Refresh browser                 | Jawaban dan progress tetap tersimpan     | succees   |
| 7    | Timer mencapai warning          | Timer berubah ke warna amber             | succees   |
| 8    | Timer mencapai critical         | Timer berubah ke warna merah + pulse     | succees   |
| 9    | Klik "Kumpulkan"                | Modal konfirmasi muncul                  | succees   |
| 10   | Konfirmasi submit               | Halaman result ditampilkan               | succees   |

#### Test Case 3: Result Page

| Step | Action                          | Expected Result                          | Status |
| ---- | ------------------------------- | ---------------------------------------- | ------ |
| 1    | Buka result tanpa quiz result   | Redirect ke quiz page                    | succees   |
| 2    | Lihat skor                      | Skor ditampilkan dengan benar            | succees   |
| 3    | Lihat level                     | Level sesuai threshold (0-40/41-75/76-100) | succees  |
| 4    | Lihat rekomendasi               | Program sesuai level                     | succees   |
| 5    | Review soal                     | Semua soal ditampilkan dengan status     | succees   |
| 6    | Klik WhatsApp button            | WhatsApp terbuka dengan pesan otomatis   | succees   |

#### Test Case 4: Responsive Design

| Step | Action                          | Expected Result                          | Status |
| ---- | ------------------------------- | ---------------------------------------- | ------ |
| 1    | Buka di mobile (375px)          | Layout stacked, navigation compact       | succees   |
| 2    | Buka di tablet (768px)          | Layout adjusted, sidebar visible         | succees   |
| 3    | Buka di desktop (1440px)        | Full layout, sidebar navigation          | succees   |


---

## Installation Guide

### Requirements

- **Node.js** >= 18.x
- **npm** >= 9.x atau **yarn** >= 1.22.x

### Clone Repository

```bash
git clone https://github.com/ridho/quiz-app.git
cd quiz-app
```

### Install Dependencies

```bash
npm install
```

### Setup Environment (Optional)

```bash
# Copy template .env (opsional - default values sudah ada)
cp .env.example .env
```

File `.env` (opsional):

```
VITE_USER_SESSION_KEY=userSession
VITE_QUIZ_ANSWERS_KEY=quizAnswers
VITE_QUIZ_PROGRESS_KEY=quizProgress
VITE_QUIZ_RESULT_KEY=quizResult
VITE_QUIZ_TIMER_KEY=quizTimeLeft
```

### Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output akan ada di folder `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## Conclusion

BunnySpeak Course adalah aplikasi web placement test yang dibangun dengan arsitektur modular menggunakan React 19, Vite 8, dan Tailwind CSS 4. Aplikasi ini menyediakan alur lengkap dari pengisian biodata, pengerjaan soal dengan timer, kalkulasi skor & level, rekomendasi program, hingga konsultasi via WhatsApp.

### Teknologi yang Digunakan
- **React 19** — Component-based UI dengan hooks
- **Vite 8** — Build tool dengan HMR cepat
- **Tailwind CSS 4** — Utility-first styling dengan custom design tokens
- **React Router 7** — Client-side routing dengan route guards
- **localStorage** — Persistensi data tanpa backend

### Hasil yang Dicapai
- Alur placement test lengkap (biodata → quiz → result → WhatsApp)
- 15 soal English dengan timer global 10 menit
- Auto-save jawaban ke localStorage
- Navigasi bebas antar soal
- Kalkulasi skor & level otomatis
- Rekomendasi program berdasarkan level
- Integrasi WhatsApp untuk konsultasi
- Responsive design (mobile, tablet, desktop)
- Route guards untuk proteksi halaman
- Design system yang konsisten

### Pengetahuan yang Diperoleh
- Arsitektur frontend modular (Pages → Components → Hooks → Utils → Data)
- State management dengan custom hooks
- Persistensi data dengan localStorage
- Responsive design dengan Tailwind CSS
- Route guards dan session management
- Timer implementation dengan urgency states
- WhatsApp deep link integration

---

<div align="center">

**BunnySpeak Course** — Dibuat dengan React, Vite, dan Tailwind CSS

</div>
