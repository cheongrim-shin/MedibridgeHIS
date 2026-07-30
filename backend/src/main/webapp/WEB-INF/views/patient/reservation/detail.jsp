<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>예약 상세 | MediBridge</title>

  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
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
          예약 상세
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          예약 정보를 확인하고 같은 화면에서 일정을 변경하거나 취소할 수 있습니다.
        </p>
      </header>

      <c:if test="${not empty message}">
        <div class="mb-6 border border-hairline bg-surface-container-low px-4 py-3 text-body-sm text-primary">
          <c:out value="${message}" />
        </div>
      </c:if>

      <section class="grid gap-gutter lg:grid-cols-[2fr_1fr]">

        <div class="border border-hairline bg-canvas-white p-6 md:p-8">

          <c:choose>

            <c:when test="${empty reservation}">

              <div class="py-12 text-center">
                <h2 class="font-headline-2 text-headline-2 text-ink-black">
                  예약 정보를 찾을 수 없습니다.
                </h2>

                <p class="mt-3 text-body-md text-ink-secondary">
                  요청한 예약번호가 없거나 현재 로그인한 회원의 예약이 아닙니다.
                </p>

                <div class="mt-6 flex justify-center gap-3">
                  <a class="inline-flex items-center border border-primary bg-primary px-5 py-3 text-body-sm text-on-primary hover:bg-tertiary"
                     href="${ctx}/patient/reservation/list">
                    예약 목록
                  </a>
                </div>
              </div>

            </c:when>

            <c:otherwise>

              <%-- 예약번호 호환 처리 --%>
              <c:set var="reservationNumberForAction"
                     value="${reservation.appointmentNumber}" />

              <c:if test="${empty reservationNumberForAction}">
                <c:set var="reservationNumberForAction"
                       value="${reservation.reservationsNumber}" />
              </c:if>

              <%-- 예약 상태 호환 처리 --%>
              <c:set var="currentReservationStatus"
                     value="${reservation.reservationStatus}" />

              <c:if test="${empty currentReservationStatus}">
                <c:set var="currentReservationStatus"
                       value="${reservation.reservationsStatus}" />
              </c:if>

              <%-- 변경·취소 가능 상태 --%>
              <c:set var="modifiable"
                     value="${currentReservationStatus eq '예약'
                             or currentReservationStatus eq '예약신청'}" />

              <%-- 화면 표시용 상태 문구 --%>
              <c:set var="statusLabel"
                     value="${currentReservationStatus}" />

              <c:if test="${currentReservationStatus eq '예약'}">
                <c:set var="statusLabel"
                       value="예약 확정" />
              </c:if>

              <c:if test="${currentReservationStatus eq '예약신청'}">
                <c:set var="statusLabel"
                       value="예약 신청" />
              </c:if>

              <c:if test="${currentReservationStatus eq '예약취소'
                            or currentReservationStatus eq '취소'}">
                <c:set var="statusLabel"
                       value="예약 취소" />
              </c:if>

              <%-- datetime-local 입력값 --%>
              <fmt:formatDate var="reservedAtValue"
                              value="${reservation.reservedAt}"
                              pattern="yyyy-MM-dd'T'HH:mm" />

              <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>

                  <span class="inline-flex items-center bg-surface-container-high px-3 py-1 font-eyebrow text-eyebrow text-ink-secondary">
                    <c:out value="${statusLabel}"
                           default="상태 미정" />
                  </span>

                  <h2 class="mt-3 font-headline-2 text-headline-2 text-ink-black">
                    <c:choose>

                      <c:when test="${not empty reservation.reservedAt}">
                        <fmt:formatDate value="${reservation.reservedAt}"
                                        pattern="yyyy.MM.dd (E) HH:mm" />
                      </c:when>

                      <c:otherwise>
                        예약일시 미정
                      </c:otherwise>

                    </c:choose>
                  </h2>

                  <p class="mt-2 text-body-md text-ink-secondary">
                    예약번호

                    <span class="font-semibold text-primary">
                      <c:out value="${reservationNumberForAction}"
                             default="-" />
                    </span>
                  </p>
                </div>
              </div>

              <div class="grid gap-4 md:grid-cols-2">

                <div class="border border-hairline bg-surface-container-low p-5">
                  <p class="text-body-sm text-ink-secondary">
                    진료과
                  </p>

                  <p class="mt-2 text-title font-semibold text-ink-black">
                    <c:out value="${reservation.deptName}"
                           default="진료과 미정" />
                  </p>
                </div>

                <div class="border border-hairline bg-surface-container-low p-5">
                  <p class="text-body-sm text-ink-secondary">
                    의료진
                  </p>

                  <p class="mt-2 text-title font-semibold text-ink-black">
                    <c:out value="${reservation.employeeName}"
                           default="의료진 미정" />
                  </p>
                </div>

                <div class="border border-hairline bg-surface-container-low p-5">
                  <p class="text-body-sm text-ink-secondary">
                    환자명
                  </p>

                  <p class="mt-2 text-title font-semibold text-ink-black">
                    <c:out value="${reservation.patientName}"
                           default="-" />
                  </p>
                </div>

                <div class="border border-hairline bg-surface-container-low p-5">
                  <p class="text-body-sm text-ink-secondary">
                    연락처
                  </p>

                  <p class="mt-2 text-title font-semibold text-ink-black">
                    <c:out value="${reservation.phone}"
                           default="-" />
                  </p>
                </div>

              </div>

              <div class="mt-6 border border-hairline bg-canvas-white p-5">
                <h3 class="font-title text-title text-ink-black">
                  예약 상세 정보
                </h3>

                <dl class="mt-4 divide-y divide-hairline">

                  <div class="flex flex-col gap-1 py-4 first:pt-0 md:flex-row md:gap-4">
                    <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-40">
                      예약번호
                    </dt>

                    <dd class="text-body-md text-ink-black">
                      <c:out value="${reservationNumberForAction}"
                             default="-" />
                    </dd>
                  </div>

                  <div class="flex flex-col gap-1 py-4 md:flex-row md:gap-4">
                    <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-40">
                      예약상태
                    </dt>

                    <dd class="text-body-md text-ink-black">
                      <c:out value="${statusLabel}"
                             default="상태 미정" />
                    </dd>
                  </div>

                  <div class="flex flex-col gap-1 py-4 md:flex-row md:gap-4">
                    <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-40">
                      예약경로
                    </dt>

                    <dd class="text-body-md text-ink-black">
                      <c:out value="${reservation.reservationSource}"
                             default="-" />
                    </dd>
                  </div>

                  <div class="flex flex-col gap-1 py-4 md:flex-row md:gap-4">
                    <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-40">
                      증상 메모
                    </dt>

                    <dd class="text-body-md text-ink-black">
                      <c:out value="${reservation.symptoms}"
                             default="-" />
                    </dd>
                  </div>

                  <div class="flex flex-col gap-1 py-4 last:pb-0 md:flex-row md:gap-4">
                    <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-40">
                      담당 의료진 코드
                    </dt>

                    <dd class="text-body-md text-ink-black">
                      <c:out value="${reservation.employeeCode}"
                             default="-" />
                    </dd>
                  </div>

                </dl>
              </div>

              <%--
                React→JSP 화면 구성 기준:
                예약 상세 아래에 변경·취소 영역을 이어서 배치한다.
                별도의 change-form.jsp로 이동하지 않는다.
              --%>
              <div class="mt-6 border-t border-hairline pt-6">
                <h3 class="font-title text-title text-ink-black">
                  예약 변경·취소
                </h3>

                <p class="mt-2 text-body-sm text-ink-secondary">
                  예약 또는 예약 신청 상태에서 날짜와 시간을 변경하거나 예약을 취소할 수 있습니다.
                </p>

                <div class="mt-5 flex flex-wrap gap-3">

                  <a class="inline-flex items-center border border-primary bg-primary px-5 py-3 text-body-sm text-on-primary hover:bg-tertiary"
                     href="${ctx}/patient/reservation/list">
                    예약 목록
                  </a>

                  <a class="inline-flex items-center border border-hairline bg-canvas-white px-5 py-3 text-body-sm text-ink-black hover:border-primary hover:text-primary"
                     href="${ctx}/patient/reservation/form">
                    새 예약 신청
                  </a>

                  <c:choose>

                    <c:when test="${modifiable}">
                      <button type="button"
                              id="btnToggleChange"
                              aria-controls="reservationChangePanel"
                              aria-expanded="false"
                              class="inline-flex items-center border border-primary bg-canvas-white px-5 py-3 text-body-sm text-primary hover:bg-surface-container-low">
                        예약 변경
                      </button>
                    </c:when>

                    <c:otherwise>
                      <span class="inline-flex items-center border border-hairline bg-surface-container-low px-5 py-3 text-body-sm text-ink-secondary">
                        예약 변경 불가
                      </span>
                    </c:otherwise>

                  </c:choose>

                  <c:choose>

                    <c:when test="${modifiable}">

                      <form action="${ctx}/patient/reservation/cancel"
                            method="post"
                            onsubmit="return confirm('예약을 취소하시겠습니까?');">

                        <c:if test="${not empty _csrf}">
                          <input type="hidden"
                                 name="${_csrf.parameterName}"
                                 value="${_csrf.token}" />
                        </c:if>

                        <input type="hidden"
                               name="appointmentNumber"
                               value="${reservationNumberForAction}" />

                        <button type="submit"
                                class="inline-flex items-center border border-error bg-canvas-white px-5 py-3 text-body-sm text-error hover:bg-surface-container-low">
                          예약 취소
                        </button>
                      </form>

                    </c:when>

                    <c:otherwise>
                      <span class="inline-flex items-center border border-hairline bg-surface-container-low px-5 py-3 text-body-sm text-ink-secondary">
                        예약 취소 불가
                      </span>
                    </c:otherwise>

                  </c:choose>
                </div>

                <%-- 같은 상세 화면 안에서 열리는 예약 변경 영역 --%>
                <c:if test="${modifiable}">

                  <div id="reservationChangePanel"
                       class="mt-6 hidden border border-hairline bg-surface-container-low p-5 md:p-6">

                    <div class="mb-5">
                      <h4 class="font-title text-title text-ink-black">
                        예약 날짜·시간 재선택
                      </h4>

                      <p class="mt-2 text-body-sm text-ink-secondary">
                        기존 의료진과 증상 메모는 유지되며 예약 일정만 변경됩니다.
                      </p>
                    </div>

                    <form action="${ctx}/patient/reservation/change"
                          method="post"
                          class="space-y-5"
                          onsubmit="return confirm('선택한 날짜와 시간으로 예약을 변경하시겠습니까?');">

                      <c:if test="${not empty _csrf}">
                        <input type="hidden"
                               name="${_csrf.parameterName}"
                               value="${_csrf.token}" />
                      </c:if>

                      <input type="hidden"
                             name="appointmentNumber"
                             value="${reservationNumberForAction}" />

                      <div>
                        <label for="reservedAt"
                               class="mb-2 block text-body-sm font-semibold text-ink-black">
                          변경할 예약 일시
                        </label>

                        <input type="datetime-local"
                               id="reservedAt"
                               name="reservedAt"
                               value="${reservedAtValue}"
                               required
                               class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md text-ink-black" />

                        <p class="mt-2 text-body-sm text-ink-secondary">
                          현재 시각 이후의 날짜와 시간을 선택해 주세요. 진료 시간은 30분으로 적용됩니다.
                        </p>
                      </div>

                      <div class="flex flex-wrap gap-3">
                        <button type="submit"
                                class="inline-flex items-center justify-center border border-primary bg-primary px-6 py-3 text-body-sm font-semibold text-on-primary hover:bg-tertiary">
                          변경 확정
                        </button>

                        <button type="button"
                                id="btnCloseChange"
                                class="inline-flex items-center justify-center border border-hairline bg-canvas-white px-6 py-3 text-body-sm font-semibold text-ink-black hover:border-primary hover:text-primary">
                          닫기
                        </button>
                      </div>

                    </form>
                  </div>

                </c:if>
              </div>

            </c:otherwise>

          </c:choose>

        </div>

        <aside class="space-y-gutter">

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">
            <h2 class="font-headline-2 text-headline-2 text-ink-black">
              예약 안내
            </h2>

            <ul class="mt-4 space-y-3 text-body-sm text-ink-secondary">
              <li>예약 상태와 진료 일정을 확인해 주세요.</li>
              <li>예약 변경 시 기존 의료진은 유지되고 날짜·시간만 변경됩니다.</li>
              <li>취소되거나 완료된 예약은 변경·취소할 수 없습니다.</li>
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
                 href="${ctx}/patient/reservation/form">
                진료 예약
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
  const btnToggleChange =
    document.getElementById('btnToggleChange');

  const btnCloseChange =
    document.getElementById('btnCloseChange');

  const reservationChangePanel =
    document.getElementById('reservationChangePanel');

  const reservedAtInput =
    document.getElementById('reservedAt');

  function setChangePanel(open) {

    if (!reservationChangePanel) {
      return;
    }

    reservationChangePanel.classList.toggle(
      'hidden',
      !open
    );

    if (btnToggleChange) {
      btnToggleChange.setAttribute(
        'aria-expanded',
        String(open)
      );
    }

    if (open && reservedAtInput) {
      reservedAtInput.focus();
    }
  }

  if (btnToggleChange) {
    btnToggleChange.addEventListener(
      'click',
      function () {

        const isHidden =
          reservationChangePanel
            .classList
            .contains('hidden');

        setChangePanel(isHidden);
      }
    );
  }

  if (btnCloseChange) {
    btnCloseChange.addEventListener(
      'click',
      function () {
        setChangePanel(false);
      }
    );
  }

  if (reservedAtInput) {
    const now = new Date();

    now.setMinutes(
      now.getMinutes() - now.getTimezoneOffset()
    );

    reservedAtInput.min =
      now.toISOString().slice(0, 16);
  }

  /*
   * 변경 실패 후 Controller가 changeOpen=true로 돌려보내면
   * 예약 변경 영역을 자동으로 다시 연다.
   */
  const queryParams =
    new URLSearchParams(window.location.search);

  if (queryParams.get('changeOpen') === 'true') {
    setChangePanel(true);
  }
</script>
</body>
</html>