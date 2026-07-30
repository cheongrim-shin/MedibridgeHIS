<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0" />

  <title>로그인 | MediBridge</title>

  <link rel="stylesheet"
        href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>

<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex flex-1 items-center justify-center px-margin-mobile py-16 md:px-margin-desktop">

    <div class="w-full max-w-md border border-hairline bg-canvas-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] md:p-10">

      <header class="mb-8 text-center">

        <h1 class="font-headline-1 text-headline-1 text-ink-black">
          로그인
        </h1>

        <p class="mx-auto mt-4 max-w-xs text-body-sm leading-relaxed text-ink-secondary">
          MediBridge 환자 포털에서<br />
          예약과 진료이력을 확인할 수 있습니다.
        </p>

      </header>

      <!-- 로그인 안내 -->
      <div class="mb-6 border border-hairline bg-surface-container-low p-4">

        <p class="flex items-start gap-2 text-body-sm leading-relaxed text-ink-secondary">

          <span class="mt-0.5 shrink-0 text-primary">
            ⓘ
          </span>

          <span>
            병원에서 발급받은 아이디와 비밀번호로 로그인해 주세요.<br />
            방문 이력이 없는 경우 본인인증 후 회원가입하여 로그인할 수 있습니다.
          </span>

        </p>

      </div>

      <!-- 로그인 실패 메시지 -->
      <c:if test="${param.error eq 'true'}">

        <div class="mb-4 border border-error bg-surface-container-low p-4">

          <p class="text-body-sm font-semibold text-error">
            아이디 또는 비밀번호를 확인해 주세요.
          </p>

        </div>

      </c:if>

      <!-- 로그아웃 메시지 -->
      <c:if test="${param.logout eq 'true'}">

        <div class="mb-4 border border-hairline bg-surface-container-low p-4">

          <p class="text-body-sm font-semibold text-primary">
            로그아웃되었습니다.
          </p>

        </div>

      </c:if>

      <!-- 회원가입 완료 메시지 -->
      <c:if test="${param.signup eq 'true'}">

        <div class="mb-4 border border-hairline bg-surface-container-low p-4">

          <p class="text-body-sm font-semibold text-primary">
            회원가입이 완료되었습니다. 가입한 계정으로 로그인해 주세요.
          </p>

        </div>

      </c:if>

      <!--
        Spring Security 로그인 처리 form

        GET  /patient/login
        - PatientPortalPageController가 로그인 화면 반환

        POST /patient/login
        - Spring Security가 로그인 처리

        SecurityConfig 기준:
        .usernameParameter("memberId")
        .passwordParameter("password")
      -->
      <form id="patientLoginForm"
            class="space-y-5"
            action="${ctx}/patient/login"
            method="post">

        <!-- CSRF 토큰 -->
        <c:if test="${not empty _csrf}">

          <input type="hidden"
                 name="${_csrf.parameterName}"
                 value="${_csrf.token}" />

        </c:if>

        <div>

          <label for="memberId"
                 class="mb-2 block text-body-sm font-semibold text-ink-black">
            아이디
          </label>

          <input id="memberId"
                 name="memberId"
                 type="text"
                 autocomplete="username"
                 placeholder="아이디를 입력하세요"
                 class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md text-ink-black outline-none transition-colors focus:border-primary" />

        </div>

        <div>

          <label for="password"
                 class="mb-2 block text-body-sm font-semibold text-ink-black">
            비밀번호
          </label>

          <input id="password"
                 name="password"
                 type="password"
                 autocomplete="current-password"
                 placeholder="비밀번호를 입력하세요"
                 class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md text-ink-black outline-none transition-colors focus:border-primary" />

        </div>

        <p id="errorMessage"
           class="hidden text-body-sm text-error"></p>

        <button type="submit"
                class="w-full bg-secondary px-6 py-4 text-button text-on-secondary transition-opacity hover:opacity-90 active:opacity-80">
          로그인
        </button>

      </form>

      <div class="mt-6 border-t border-hairline pt-6 text-center">

        <p class="text-body-sm text-ink-secondary">
          아직 환자포털 계정이 없으신가요?
        </p>

        <a href="${ctx}/patient/signup"
           class="mt-3 inline-block font-semibold text-secondary hover:underline">
          환자 회원가입
        </a>

      </div>

    </div>

  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>

<script>
  const memberIdInput =
      document.getElementById('memberId');

  const passwordInput =
      document.getElementById('password');

  const errorMessage =
      document.getElementById('errorMessage');

  const loginForm =
      document.getElementById('patientLoginForm');

  /*
   * 화면에 입력 검증 오류 메시지를 표시한다.
   */
  function showError(message) {

    if (!errorMessage) {
      return;
    }

    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
  }

  /*
   * 기존 입력 검증 오류 메시지를 제거한다.
   */
  function clearError() {

    if (!errorMessage) {
      return;
    }

    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
  }

  if (memberIdInput) {

    memberIdInput.addEventListener(
      'input',
      clearError
    );
  }

  if (passwordInput) {

    passwordInput.addEventListener(
      'input',
      clearError
    );
  }

  /*
   * 아이디와 비밀번호의 공백 입력을 검증한다.
   *
   * 서버에서도 Spring Security가
   * 실제 로그인 정보를 다시 검증한다.
   */
  if (loginForm) {

    loginForm.addEventListener(
      'submit',
      function (event) {

        if (!memberIdInput
            || !memberIdInput.value.trim()) {

          event.preventDefault();

          showError(
            '아이디를 입력해 주세요.'
          );

          if (memberIdInput) {
            memberIdInput.focus();
          }

          return;
        }

        if (!passwordInput
            || !passwordInput.value.trim()) {

          event.preventDefault();

          showError(
            '비밀번호를 입력해 주세요.'
          );

          if (passwordInput) {
            passwordInput.focus();
          }
        }
      }
    );
  }
</script>

</body>
</html>