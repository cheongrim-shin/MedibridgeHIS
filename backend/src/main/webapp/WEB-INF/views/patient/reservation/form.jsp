<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0" />

  <title>진료 예약 | MediBridge</title>

  <link rel="stylesheet"
        href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>

<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">

    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">

        <p class="font-eyebrow text-eyebrow text-primary">
          MEDIBRIDGE APPOINTMENT
        </p>

        <h1 class="mt-2 font-headline-1 text-headline-1 font-bold md:text-display-1">
          진료 예약
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          진료과와 의료진, 예약 희망 일시를 선택해 주세요.
        </p>

      </header>

      <section class="mb-8 border border-hairline bg-canvas-white p-5 md:p-6">

        <ol class="grid gap-3 md:grid-cols-4">

          <li class="flex items-center gap-3">

            <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-body-sm font-semibold text-on-primary">
              1
            </span>

            <span class="text-body-sm font-semibold text-ink-black">
              진료과 선택
            </span>

          </li>

          <li class="flex items-center gap-3">

            <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-body-sm font-semibold text-ink-secondary">
              2
            </span>

            <span class="text-body-sm font-semibold text-ink-black">
              의사 선택
            </span>

          </li>

          <li class="flex items-center gap-3">

            <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-body-sm font-semibold text-ink-secondary">
              3
            </span>

            <span class="text-body-sm font-semibold text-ink-black">
              날짜·시간 선택
            </span>

          </li>

          <li class="flex items-center gap-3">

            <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-body-sm font-semibold text-ink-secondary">
              4
            </span>

            <span class="text-body-sm font-semibold text-ink-black">
              예약 확인
            </span>

          </li>

        </ol>

      </section>

      <section class="grid gap-gutter lg:grid-cols-[2fr_1fr]">

        <div class="border border-hairline bg-canvas-white p-6 md:p-8">

          <div class="mb-6">

            <h2 class="font-headline-2 text-headline-2 text-ink-black">
              예약 정보 입력
            </h2>

            <p class="mt-2 text-body-md text-ink-secondary">
              예약에 필요한 정보를 순서대로 선택해 주세요.
            </p>

            <!-- 일반 메시지: 화면 내부에 표시 -->
            <c:if test="${not empty message}">

              <div class="mt-4 border border-hairline bg-surface-container-low px-4 py-3 text-body-sm text-primary">
                <c:out value="${message}" />
              </div>

            </c:if>

            <!--
              중복 예약 메시지

              화면에는 숨기고 하단 JavaScript에서
              textContent를 읽어 alert으로 표시한다.
            -->
            <c:if test="${not empty alertMessage}">

              <p id="reservationAlertMessage"
                 hidden>
                <c:out value="${alertMessage}" />
              </p>

            </c:if>

          </div>

          <%--
            예약 등록 form

            - POST /patient/reservation/insert
            - CSRF 토큰 포함
            - memberNumber는 화면에서 전송하지 않음
            - 로그인 사용자 기준으로 Controller에서 설정
          --%>
          <form action="${ctx}/patient/reservation/insert"
                method="post"
                class="space-y-8">

            <c:if test="${not empty _csrf}">

              <input type="hidden"
                     name="${_csrf.parameterName}"
                     value="${_csrf.token}" />

            </c:if>

            <section>

              <div class="mb-3 flex items-center gap-2">

                <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-body-sm font-semibold text-on-primary">
                  1
                </span>

                <h3 class="font-title text-title text-ink-black">
                  진료과 선택
                </h3>

              </div>

              <label for="deptCode"
                     class="mb-2 block text-body-sm font-semibold text-ink-black">
                진료과
              </label>

              <select id="deptCode"
                      name="deptCode"
                      required
                      class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md text-ink-black">

                <option value="">
                  진료과를 선택하세요
                </option>

                <c:forEach var="department"
                           items="${departmentList}">

                  <option value="${department.deptCode}">
                    <c:out value="${department.deptName}" />
                  </option>

                </c:forEach>

              </select>

              <c:if test="${empty departmentList}">

                <p class="mt-2 text-body-sm text-error">
                  현재 선택 가능한 진료과가 없습니다.
                </p>

              </c:if>

            </section>

            <section>

              <div class="mb-3 flex items-center gap-2">

                <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-body-sm font-semibold text-on-primary">
                  2
                </span>

                <h3 class="font-title text-title text-ink-black">
                  의사 선택
                </h3>

              </div>

              <label for="employeeCode"
                     class="mb-2 block text-body-sm font-semibold text-ink-black">
                의료진
              </label>

              <select id="employeeCode"
                      name="employeeCode"
                      required
                      disabled
                      class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md text-ink-black">

                <option value="">
                  진료과를 먼저 선택하세요
                </option>

              </select>

              <p id="doctorHelp"
                 class="mt-2 text-body-sm text-ink-secondary"
                 aria-live="polite">
                진료과를 선택하면 해당 진료과의 의료진을 불러옵니다.
              </p>

            </section>

            <section>

              <div class="mb-3 flex items-center gap-2">

                <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-body-sm font-semibold text-on-primary">
                  3
                </span>

                <h3 class="font-title text-title text-ink-black">
                  날짜·시간 선택
                </h3>

              </div>

              <label for="reservedAt"
                     class="mb-2 block text-body-sm font-semibold text-ink-black">
                예약 희망 일시
              </label>

              <input type="datetime-local"
                     id="reservedAt"
                     name="reservedAt"
                     required
                     class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md text-ink-black" />

              <p class="mt-2 text-body-sm text-ink-secondary">
                현재 시각 이후의 날짜와 시간을 선택해 주세요.
              </p>

            </section>

            <section>

              <div class="mb-3 flex items-center gap-2">

                <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-body-sm font-semibold text-on-primary">
                  4
                </span>

                <h3 class="font-title text-title text-ink-black">
                  예약 확인
                </h3>

              </div>

              <label for="symptoms"
                     class="mb-2 block text-body-sm font-semibold text-ink-black">

                증상 메모

                <span class="font-normal text-ink-muted">
                  (선택)
                </span>

              </label>

              <textarea id="symptoms"
                        name="symptoms"
                        rows="5"
                        placeholder="증상이나 예약 요청사항을 입력해 주세요."
                        class="w-full resize-none border border-hairline bg-canvas-white px-4 py-3 text-body-md text-ink-black"></textarea>

            </section>

            <div class="flex flex-wrap gap-3 border-t border-hairline pt-6">

              <button type="submit"
                      class="inline-flex items-center justify-center border border-primary bg-primary px-6 py-3 text-body-sm font-semibold text-on-primary hover:bg-tertiary">
                예약 신청
              </button>

              <a class="inline-flex items-center justify-center border border-hairline bg-canvas-white px-6 py-3 text-body-sm font-semibold text-ink-black hover:border-primary hover:text-primary"
                 href="${ctx}/patient/reservation/list">
                예약 확인·변경
              </a>

            </div>

          </form>

        </div>

        <aside class="space-y-gutter">

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">

            <h2 class="font-headline-2 text-headline-2 text-ink-black">
              예약 안내
            </h2>

            <ul class="mt-4 space-y-3 text-body-sm text-ink-secondary">

              <li>
                진료과를 먼저 선택한 뒤 의료진을 선택해 주세요.
              </li>

              <li>
                예약 신청 후 예약 확인·변경 화면에서 내역을 확인할 수 있습니다.
              </li>

              <li>
                예약 일정은 병원 사정에 따라 조정될 수 있습니다.
              </li>

            </ul>

          </div>

          <div class="border border-hairline bg-surface-container-low p-6 md:p-8">

            <h2 class="font-headline-2 text-headline-2 text-ink-black">
              빠른 이동
            </h2>

            <div class="mt-4 flex flex-col gap-3">

              <a class="text-body-sm text-primary hover:underline"
                 href="${ctx}/patient/reservation/list">
                예약 확인·변경
              </a>

              <a class="text-body-sm text-primary hover:underline"
                 href="${ctx}/patient/mypage">
                마이페이지
              </a>

            </div>

          </div>

        </aside>

      </section>

    </div>

  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>

<script>
  /*
   * 중복 예약 메시지 alert 표시
   *
   * Controller에서 alertMessage가 전달된 경우에만
   * hidden 요소가 생성되므로 해당 요소가 있을 때만 실행한다.
   */
  const reservationAlertMessage =
      document.getElementById(
        'reservationAlertMessage'
      );

  if (reservationAlertMessage) {

    const alertText =
        reservationAlertMessage
          .textContent
          .trim();

    if (alertText) {
      window.alert(alertText);
    }
  }

  /*
   * 애플리케이션 Context Path
   *
   * 예:
   * 빈 문자열 또는 /MedibridgeHISBE
   */
  const ctx = '${ctx}';

  const deptSelect =
      document.getElementById('deptCode');

  const doctorSelect =
      document.getElementById('employeeCode');

  const doctorHelp =
      document.getElementById('doctorHelp');

  const reservedAtInput =
      document.getElementById('reservedAt');

  /*
   * 의료진 select 초기화
   *
   * message:
   * 첫 번째 option에 표시할 안내 문구
   *
   * disabled:
   * 의료진 선택창 비활성화 여부
   */
  function resetDoctorSelect(
      message,
      disabled
  ) {

    if (!doctorSelect) {
      return;
    }

    doctorSelect.innerHTML = '';

    const option =
        document.createElement('option');

    option.value = '';
    option.textContent = message;

    doctorSelect.appendChild(option);

    doctorSelect.value = '';
    doctorSelect.disabled = disabled;
  }

  /*
   * 진료과별 의료진 비동기 조회
   *
   * 요청:
   * GET /patient/reservation/api/doctors?deptCode=D03
   *
   * 응답:
   * JSON 배열
   */
  async function loadDoctorsByDepartment(
      deptCode
  ) {

    resetDoctorSelect(
      '의료진을 불러오는 중입니다.',
      true
    );

    if (doctorHelp) {

      doctorHelp.textContent =
          '선택한 진료과의 의료진을 조회하고 있습니다.';

      doctorHelp.className =
          'mt-2 text-body-sm text-ink-secondary';
    }

    try {

      /*
       * fetch는 서버에 비동기 GET 요청을 보낸다.
       *
       * encodeURIComponent를 사용하여
       * 진료과 코드를 안전하게 URL에 포함한다.
       */
      const response = await fetch(
        ctx
        + '/patient/reservation/api/doctors'
        + '?deptCode='
        + encodeURIComponent(deptCode),
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      /*
       * HTTP 200번대가 아니면
       * 오류 처리 구문으로 이동한다.
       */
      if (!response.ok) {

        throw new Error(
          '의료진 조회 요청에 실패했습니다.'
        );
      }

      /*
       * 서버가 반환한 JSON 문자열을
       * JavaScript 배열로 변환한다.
       */
      const doctorList =
          await response.json();

      resetDoctorSelect(
        '의료진을 선택하세요',
        false
      );

      /*
       * 조회 결과가 없으면
       * 의료진 선택창을 다시 비활성화한다.
       */
      if (!Array.isArray(doctorList)
          || doctorList.length === 0) {

        resetDoctorSelect(
          '선택 가능한 의료진이 없습니다.',
          true
        );

        if (doctorHelp) {

          doctorHelp.textContent =
              '선택한 진료과에 예약 가능한 의료진이 없습니다.';

          doctorHelp.className =
              'mt-2 text-body-sm text-error';
        }

        return;
      }

      /*
       * JSON 배열의 각 의료진을
       * select의 option으로 동적 생성한다.
       */
      doctorList.forEach(
        function (doctor) {

          const option =
              document.createElement('option');

          option.value =
              doctor.employeeCode;

          option.textContent =
              doctor.employeeName
              + (
                  doctor.deptName
                    ? ' · ' + doctor.deptName
                    : ''
                );

          doctorSelect.appendChild(option);
        }
      );

      doctorSelect.disabled = false;

      if (doctorHelp) {

        doctorHelp.textContent =
            doctorList.length
            + '명의 의료진을 불러왔습니다.';

        doctorHelp.className =
            'mt-2 text-body-sm text-ink-secondary';
      }

    } catch (error) {

      console.error(error);

      resetDoctorSelect(
        '의료진 조회에 실패했습니다.',
        true
      );

      if (doctorHelp) {

        doctorHelp.textContent =
            '의료진 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';

        doctorHelp.className =
            'mt-2 text-body-sm text-error';
      }
    }
  }

  /*
   * 진료과가 변경되면
   * 해당 진료과의 의료진을 새로 조회한다.
   */
  if (deptSelect && doctorSelect) {

    deptSelect.addEventListener(
      'change',
      function () {

        const selectedDeptCode =
            this.value;

        /*
         * 진료과 선택을 취소한 경우
         * 의료진 선택창도 초기화한다.
         */
        if (!selectedDeptCode) {

          resetDoctorSelect(
            '진료과를 먼저 선택하세요',
            true
          );

          if (doctorHelp) {

            doctorHelp.textContent =
                '진료과를 선택하면 해당 진료과의 의료진을 불러옵니다.';

            doctorHelp.className =
                'mt-2 text-body-sm text-ink-secondary';
          }

          return;
        }

        loadDoctorsByDepartment(
          selectedDeptCode
        );
      }
    );

    /*
     * 서버에서 진료과가 미리 선택된 경우에도
     * 의료진 목록을 자동으로 조회한다.
     */
    if (deptSelect.value) {

      loadDoctorsByDepartment(
        deptSelect.value
      );
    }
  }

  /*
   * 과거 날짜를 선택하지 못하도록
   * datetime-local의 최소값을 현재 시각으로 설정한다.
   *
   * 서버 Service에서도 과거 날짜를 다시 검증한다.
   */
  if (reservedAtInput) {

    const now =
        new Date();

    now.setMinutes(
      now.getMinutes()
      - now.getTimezoneOffset()
    );

    reservedAtInput.min =
        now.toISOString()
          .slice(0, 16);
  }
</script>

</body>
</html>