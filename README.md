# 메디브릿지 (Medibridge) — 병원정보시스템 HIS

중소형 병원의 외래 진료 전 과정(**접수 → 진료 → 치료 → 수납**)을 하나의 시스템에서 처리하는 정형외과 특화 풀스택 병원정보시스템입니다.

원무 직원 · 의사 · 간호사 · 약사 · 물리치료사 · 관리자 · 환자 등 **역할별로 화면을 분리**해 실제 병원 운영 흐름에 맞춰 설계했습니다.

- **개발 기간** 2026.07
- **팀 구성** 4인
- **교육 과정** 대덕인재개발원 2025년 15기 최종 프로젝트

| 디렉터리 | 설명 |
|---|---|
| [`backend/`](./backend) | Spring Boot API 서버 |
| [`frontend/`](./frontend) | React + TypeScript 클라이언트 |

---

## 기여자

**4인 팀 프로젝트입니다.**

이 저장소는 **공개용 스냅샷**입니다. 원본 팀 저장소의 커밋 이력에 교육기관 공용 DB 접속정보가 포함되어 있어, 히스토리 없이 현재 소스만 공개합니다. **따라서 커밋 기록이 실제 기여도를 반영하지 않습니다.**

| 담당 도메인 | GitHub |
|---|---|
| 원무행정 · 물리치료 | [@cheongrim-shin](https://github.com/cheongrim-shin) |
| 의사 · 외래간호 | [@dndkdndk104-cyber](https://github.com/dndkdndk104-cyber) |
| 약제 · 관리자 · 시큐리티 | [@dsnr215](https://github.com/dsnr215) |
| 환자포털 | [@tkddlr](https://github.com/tkddlr) |

원본 팀 저장소(비공개)의 커밋 이력 · PR · 코드 리뷰 기록은 요청 시 공유 가능합니다.

---

## 기술 스택

**Backend** Java 21 · Spring Boot 4.1.0 · Spring Security 7.1.0 · MyBatis 3.5.19 · JJWT 0.12.6 · Lombok · Maven
**Frontend** React 19 · TypeScript 6 · Vite 6 · React Router 7 · Axios · Chart.js · FullCalendar
**Database** Oracle 21c XE
**External** PortOne V2 (결제) · LM Studio (로컬 LLM) · 공공데이터포털 HIRA API
**협업** Git / GitHub · Redmine

---

## 도메인 구성

```
backend/src/main/java/ddit/
├── common/              공통 — 예외 핸들러, 공통코드, 암호화 유틸, LM Studio 클라이언트
├── login/               인증 · 인가 (JWT + Spring Security)
├── member/              직원 · 부서 · 직급
├── receptionist/        원무행정 — 예약 · 접수 · 수납 · 서류 발급
├── doctor/              진료 — 진료 기록 · 처방
├── outpatientNurse/     외래 간호 — 대기 관리 · 주사 처방
├── physicalTherapist/   물리치료 — 치료 항목 · 대기열 · 베드 관리
├── pharmacist/          약제 — 조제 · 의약품 관리
├── patient/             환자 포털 — 회원가입 · 예약 · 마이페이지
└── admin/               관리자 — 직원/환자 관리 · 게시판 · 통계
```

---

## 실행 방법

### 1. 사전 준비

| 항목 | 버전 |
|---|---|
| JDK | 21 |
| Node.js | 20 이상 |
| Oracle | 21c XE |
| Maven | `mvnw` 포함 (별도 설치 불필요) |

### 2. 백엔드 설정

민감한 값(DB 접속정보, API 키)은 **저장소에 커밋하지 않고 환경변수로 주입**합니다.

```bash
cd backend
cp src/main/resources/application-example.properties \
   src/main/resources/application.properties
```

> `application.properties`는 `.gitignore` 대상입니다. **절대 커밋하지 마세요.**

### 3. 환경변수 등록

아래 변수를 OS 환경변수 또는 IDE 실행 설정에 등록합니다. **기본값이 없는 항목은 누락되면 애플리케이션이 부팅 단계에서 실패**합니다 (설정 누락을 런타임이 아니라 시작 시점에 잡기 위한 의도입니다).

| 환경변수 | 필수 | 설명 | 발급 / 생성 |
|---|:---:|---|---|
| `DB_URL` | ✅ | Oracle JDBC URL | `jdbc:oracle:thin:@<host>:1521/<service>` |
| `DB_USERNAME` | ✅ | DB 계정 | — |
| `DB_PASSWORD` | ✅ | DB 비밀번호 | — |
| `JWT_SECRET` | ✅ | JWT 서명 키 (32byte 이상) | `openssl rand -base64 48` |
| `AES_SECRET_KEY` | ✅ | 주민번호 암호화 키 (Base64, **정확히 32byte**) | `openssl rand -base64 32` |
| `GEMINI_API_KEY` | ✅ | Google Gemini | [Google AI Studio](https://aistudio.google.com/apikey) |
| `HIRA_API_KEY` | ✅ | 건강보험심사평가원 | [공공데이터포털](https://www.data.go.kr) |
| `PORTONE_API_SECRET` | ✅ | PortOne V2 결제 | [PortOne 콘솔](https://admin.portone.io) |
| `LMSTUDIO_BASE_URL` | — | 로컬 LLM 엔드포인트 | 기본값 `http://localhost:1234/v1` |
| `LMSTUDIO_MODEL` | — | 모델명 | 기본값 `google/gemma-4-e2b` |
| `SERVER_PORT` | — | 서버 포트 | 기본값 `80` |

<details>
<summary><b>Windows — 환경변수 등록</b></summary>

**방법 A — IDE 실행 설정에만 등록 (권장)**

```
프로젝트 우클릭 → Run As → Run Configurations...
  → [Environment] 탭 → [Add]
```

시스템 설정을 건드리지 않고, IDE 재시작도 필요 없습니다.

**방법 B — 시스템 환경변수**

```cmd
setx DB_PASSWORD "값"
```

⚠️ 등록 후 **IDE를 완전히 종료하고 다시 실행**해야 반영됩니다. IDE는 시작 시점의 환경변수를 물고 있습니다.
</details>

<details>
<summary><b>macOS / Linux — 환경변수 등록</b></summary>

```bash
# ~/.zshrc 또는 ~/.bashrc
export DB_PASSWORD="값"
export JWT_SECRET="값"
```
</details>

### 4. 백엔드 실행

```bash
cd backend
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
```

`http://localhost:80` 에서 기동됩니다.

### 5. 프론트엔드 실행

PortOne 결제 연동을 위해 `.env` 파일이 필요합니다.

```bash
cd frontend

# .env 생성 (이 파일도 .gitignore 대상)
cat > .env <<'EOF'
VITE_PORTONE_STORE_ID=<PortOne 상점 ID>
VITE_PORTONE_CHANNEL_KEY=<PortOne 채널 키>
EOF

npm install
npm run dev
```

`http://localhost:5173` 에서 열립니다. `/api` 요청은 Vite 프록시가 백엔드(`localhost:80`)로 전달합니다.

> **백엔드를 먼저 띄우세요.** 백엔드가 없으면 모든 API 호출이 실패합니다.

### 6. AI 예약 파싱 (선택)

자연어 예약 입력 기능을 쓰려면 [LM Studio](https://lmstudio.ai)를 설치하고 로컬 서버를 실행합니다.

1. LM Studio에서 `google/gemma-4-e2b` 모델 다운로드
2. `Local Server` 탭 → `Start Server` (기본 포트 1234)
3. 필요하면 `LMSTUDIO_BASE_URL` 환경변수로 주소 변경

> 환자 정보를 외부로 전송하지 않기 위해 외부 AI API 대신 로컬 LLM을 사용합니다. LM Studio가 꺼져 있어도 다른 기능은 정상 동작하며, AI 파싱만 비활성됩니다.

---

## 프로젝트 규약

### 계층 구조

```
Controller → Service → Mapper(MyBatis) → DB
```

- `Controller` — 요청/응답 변환, 상태코드 결정. 비즈니스 로직 없음
- `Service` — 트랜잭션 경계, 검증, 도메인 로직
- `Mapper` — SQL 전용. `backend/src/main/resources/mybatis/mapper/**/*-Mapper.xml`

### API 응답 규약

HTTP 상태코드를 의미 단위로 사용합니다.

| 상황 | 응답 |
|---|---|
| 조회 성공 | `200 OK` + 본문 |
| 리소스 생성 | `201 Created` + 생성된 식별자 |
| 삭제 성공 | `204 No Content` (돌려줄 본문 없음) |
| 상태 변경 성공 (복원 등) | `200 OK` + 결과 |
| 입력값 검증 실패 | `400 Bad Request` |
| 상태 충돌 | `409 Conflict` + `errorCode` |
| 예상 못한 예외 | `500` (스택트레이스는 서버 로그에만) |

예외 처리는 `ddit/common/GlobalExceptionHandler`에서 일괄 담당합니다. 컨트롤러에서 `try-catch`로 감싸지 않습니다.

### 보안 규약

| 대상 | 처리 방식 |
|---|---|
| 주민등록번호 | 앞 7자리 평문(조회용) + 뒷 6자리 **AES-256-GCM**. 암호화마다 새 IV 생성 |
| 비밀번호 | BCrypt 해시 |
| 비밀 설정값 | 소스에 하드코딩 금지. 환경변수 주입 + 부팅 시 검증 |
| 결제 금액 | 클라이언트 값 불신. **서버 재계산** 후 PortOne 원장과 대조 |
| 환자 정보 + AI | 외부 AI API 미사용. 로컬 LLM으로 처리 |
| 공통코드 | 모든 `UPDATE`/`DELETE`에 그룹 가드(`COMMONCODE = '<그룹>'`) 명시 |
| 삭제 | 물리 삭제 대신 `USED='N'` 소프트 삭제 + 복원 지원 |

### 브랜치 전략

```
main                              배포 기준
feat/<도메인>/<이니셜><MMDD>       기능 개발      예) feat/receptionist/SCR0713
hotfix/<도메인>/<이니셜><MMDD>     긴급 수정
```

`main`에 직접 push하지 않고 PR을 통해 병합합니다.

---

## 트러블슈팅

<details>
<summary><b>변경하지 않은 파일 수백 개가 수정 상태로 뜹니다</b></summary>

개행문자(CRLF ↔ LF) 차이입니다. Windows에서 아래 설정을 한 번 적용하세요.

```bash
git config core.autocrlf true
```

Git이 커밋 시 LF로 정규화해 유령 diff가 생기지 않습니다.
</details>

<details>
<summary><b><code>Could not resolve placeholder 'DB_PASSWORD'</code> 오류</b></summary>

환경변수가 등록되지 않았거나, 등록 후 IDE를 재시작하지 않은 경우입니다.

```cmd
echo %DB_PASSWORD%     :: Windows
echo $DB_PASSWORD      # macOS/Linux
```

값이 안 나오면 등록이 안 된 것입니다.
</details>

<details>
<summary><b>프론트엔드에서 API 호출이 모두 실패합니다</b></summary>

1. 백엔드가 `localhost:80`에서 실행 중인지 확인
2. 80번 포트가 다른 프로그램(IIS, Skype 등)에 점유되지 않았는지 확인
3. 포트를 바꿔야 하면 `SERVER_PORT`와 `frontend/vite.config.ts`의 `proxy.target`을 함께 수정
</details>

<details>
<summary><b><code>fatal: Unable to create '.git/index.lock': File exists</code></b></summary>

이전 Git 작업이 비정상 종료되어 남은 잠금 파일입니다. 실행 중인 Git 프로세스와 IDE를 닫고 삭제하세요.

```cmd
del ".git\index.lock"
```
</details>

---

## 산출물

- 요구사항 정의서
- 유즈케이스 다이어그램
- 프로세스 흐름도
- ERD
- 화면 설계서
