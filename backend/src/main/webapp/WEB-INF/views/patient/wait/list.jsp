<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>대기현황 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          대기현황
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          접수 후 현재 대기 순번과 진료 진행 상태를 확인할 수 있습니다.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="grid grid-cols-1 gap-4 md:grid-cols-3">

            <article class="border border-hairline bg-canvas-white p-6">
              <p class="text-body-sm text-ink-muted">
                전체 대기
              </p>
              <p class="mt-2 text-headline-1 font-bold text-ink-black">
                ${totalCount}
              </p>
            </article>

            <article class="border border-hairline bg-canvas-white p-6">
              <p class="text-body-sm text-ink-muted">
                대기
              </p>
              <p class="mt-2 text-headline-1 font-bold text-primary">
                ${waitingCount}
              </p>
            </article>

            <article class="border border-hairline bg-canvas-white p-6">
              <p class="text-body-sm text-ink-muted">
                보류
              </p>
              <p class="mt-2 text-headline-1 font-bold text-ink-secondary">
                ${holdCount}
              </p>
            </article>

          </section>

          <section class="border border-hairline bg-canvas-white p-6 md:p-8">

            <div class="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 class="font-headline-2 text-headline-2 text-ink-black">
                  현재 대기 목록
                </h2>

                <p class="mt-2 text-body-sm text-ink-secondary">
                  대기 순번 기준으로 표시됩니다.
                </p>
              </div>
            </div>

            <div class="hidden overflow-x-auto md:block">
              <table class="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr class="bg-surface-container-low">
                    <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                      순번
                    </th>

                    <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                      환자명
                    </th>

                    <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                      진료번호
                    </th>

                    <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                      담당자
                    </th>

                    <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                      접수상태
                    </th>

                    <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                      대기상태
                    </th>

                    <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                      보류사유
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <c:choose>

                    <c:when test="${empty waitList}">
                      <tr>
                        <td colspan="7" class="px-4 py-16 text-center text-body-md text-ink-secondary">
                          현재 대기 중인 환자가 없습니다.
                        </td>
                      </tr>
                    </c:when>

                    <c:otherwise>
                      <c:forEach var="wait" items="${waitList}">
                        <tr class="hover:bg-surface-container-low">

                          <td class="border-b border-hairline px-4 py-4 text-body-md font-bold text-primary">
                            ${wait.waitingTurnNumber}
                          </td>

                          <td class="border-b border-hairline px-4 py-4 text-body-md text-ink-black">
                            <c:out value="${wait.patientName}" default="환자명 미등록" />
                          </td>

                          <td class="border-b border-hairline px-4 py-4 text-body-md text-ink-black">
                            <c:out value="${wait.medicalNumber}" default="-" />
                          </td>

                          <td class="border-b border-hairline px-4 py-4 text-body-md text-ink-black">
                            <c:out value="${wait.employeeName}" default="${wait.employeeCode}" />
                          </td>

                          <td class="border-b border-hairline px-4 py-4 text-body-sm text-ink-secondary">
                            <c:out value="${wait.receiptStatus}" default="접수상태 미정" />
                          </td>

                          <td class="border-b border-hairline px-4 py-4 text-body-sm">
                            <c:choose>
                              <c:when test="${wait.standbyState eq '대기'}">
                                <span class="text-primary">
                                  대기
                                </span>
                              </c:when>

                              <c:when test="${wait.standbyState eq '보류'}">
                                <span class="text-ink-muted">
                                  보류
                                </span>
                              </c:when>

                              <c:otherwise>
                                <span class="text-ink-secondary">
                                  <c:out value="${wait.standbyState}" default="상태 미정" />
                                </span>
                              </c:otherwise>
                            </c:choose>
                          </td>

                          <td class="border-b border-hairline px-4 py-4 text-body-sm text-ink-secondary">
                            <c:out value="${wait.holdReason}" default="-" />
                          </td>

                        </tr>
                      </c:forEach>
                    </c:otherwise>

                  </c:choose>
                </tbody>
              </table>
            </div>

            <div class="space-y-4 md:hidden">
              <c:choose>

                <c:when test="${empty waitList}">
                  <div class="border border-hairline p-8 text-center text-body-md text-ink-secondary">
                    현재 대기 중인 환자가 없습니다.
                  </div>
                </c:when>

                <c:otherwise>
                  <c:forEach var="wait" items="${waitList}">
                    <article class="border border-hairline p-5">

                      <div class="mb-3 flex flex-wrap items-center gap-2">
                        <span class="bg-primary px-2 py-1 text-eyebrow text-on-primary">
                          순번 ${wait.waitingTurnNumber}
                        </span>

                        <span class="text-body-sm text-ink-muted">
                          <c:out value="${wait.standbyState}" default="상태 미정" />
                        </span>
                      </div>

                      <p class="text-headline-2 font-bold text-ink-black">
                        <c:out value="${wait.patientName}" default="환자명 미등록" />
                      </p>

                      <p class="mt-2 text-body-md text-ink-black">
                        진료번호:
                        <c:out value="${wait.medicalNumber}" default="-" />
                      </p>

                      <p class="mt-1 text-body-sm text-ink-secondary">
                        담당자:
                        <c:out value="${wait.employeeName}" default="${wait.employeeCode}" />
                      </p>

                      <p class="mt-1 text-body-sm text-ink-secondary">
                        접수상태:
                        <c:out value="${wait.receiptStatus}" default="접수상태 미정" />
                      </p>

                      <c:if test="${not empty wait.holdReason}">
                        <p class="mt-1 text-body-sm text-ink-secondary">
                          보류사유:
                          <c:out value="${wait.holdReason}" />
                        </p>
                      </c:if>

                    </article>
                  </c:forEach>
                </c:otherwise>

              </c:choose>
            </div>

          </section>

        </div>

        <aside class="h-fit space-y-gutter lg:sticky lg:top-28">

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">
            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
              대기현황 안내
            </h2>

            <ul class="space-y-3 text-body-sm text-ink-secondary">
              <li>· 대기 순번은 접수 및 진료실 상황에 따라 변경될 수 있습니다.</li>
              <li>· 검사, 수납, 진료 지연 상황에 따라 예상 대기 시간이 달라질 수 있습니다.</li>
              <li>· 보류 상태인 경우 원무과 또는 안내데스크에 문의해 주세요.</li>
              <li>· 긴급 환자 발생 시 진료 순서가 조정될 수 있습니다.</li>
            </ul>
          </div>

          <a class="flex items-center justify-between border border-hairline bg-canvas-white px-4 py-3 text-body-md text-ink-black transition-colors hover:border-primary md:px-6 md:py-4"
             href="${ctx}/patient/reservation/list">
            예약확인/취소
            <span class="text-primary">&gt;</span>
          </a>

        </aside>

      </div>

    </div>
  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>

</body>
</html>