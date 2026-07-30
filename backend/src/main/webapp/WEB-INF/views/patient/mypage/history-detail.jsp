<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />


<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>진료이력 상세 | MediBridge</title>

  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <a class="mb-6 inline-flex items-center text-body-sm text-ink-secondary transition-colors hover:text-primary"
         href="${ctx}/patient/mypage?tab=history}">
        ← 진료이력
      </a>

      <header class="mb-8">
        <p class="font-eyebrow text-eyebrow text-primary">
          MEDICAL HISTORY
        </p>

        <h1 class="mt-2 font-headline-1 text-headline-1 font-bold md:text-display-1">
          진료이력 상세
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          접수 정보와 진료 기록을 확인할 수 있습니다.
        </p>
      </header>

      <c:choose>

        <c:when test="${empty history}">
          <section class="border border-hairline bg-canvas-white px-6 py-16 text-center md:px-8">
            <h2 class="font-headline-1 text-headline-1 text-ink-black">
              진료이력 정보를 찾을 수 없습니다.
            </h2>

            <p class="mt-4 text-body-md text-ink-secondary">
              요청하신 진료번호에 해당하는 이력이 없습니다.
            </p>

            <div class="mt-8">
              <a class="inline-flex items-center border border-primary bg-primary px-6 py-3 text-body-md text-on-primary transition-opacity hover:opacity-90"
                 href="${ctx}/patient/mypage?tab=history}">
                진료이력으로
              </a>
            </div>
          </section>
        </c:when>

        <c:otherwise>

          <section class="space-y-gutter">

            <!-- 진료 요약 카드 -->
            <div class="border border-hairline bg-canvas-white">

              <div class="border-b border-hairline bg-surface-container-low px-6 py-5 md:px-8">
                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>
                    <p class="font-eyebrow text-eyebrow text-primary">
                      진료번호
                    </p>

                    <h2 class="mt-1 font-headline-2 text-headline-2 text-ink-black">
                      <c:out value="${history.medicalNumber}" default="-" />
                    </h2>
                  </div>

                  <span class="inline-flex w-fit items-center border border-primary px-3 py-1 text-body-sm text-primary">
                    <c:out value="${history.visitType}" default="외래" />
                  </span>

                </div>
              </div>

              <div class="grid grid-cols-1 gap-0 md:grid-cols-2">

                <div class="border-b border-hairline px-6 py-5 md:border-r md:px-8">
                  <p class="text-body-sm text-ink-muted">환자명</p>
                  <p class="mt-2 text-body-md text-ink-black">
                    <c:out value="${history.patientName}" default="환자명 미등록" />
                  </p>
                </div>

                <div class="border-b border-hairline px-6 py-5 md:px-8">
                  <p class="text-body-sm text-ink-muted">환자번호</p>
                  <p class="mt-2 text-body-md text-ink-black">
                    <c:out value="${history.patientNo}" default="-" />
                  </p>
                </div>

                <div class="border-b border-hairline px-6 py-5 md:border-r md:px-8">
                  <p class="text-body-sm text-ink-muted">진료과</p>
                  <p class="mt-2 text-body-md text-ink-black">
                    <c:choose>
                      <c:when test="${not empty history.deptName}">
                        <c:out value="${history.deptName}" />
                      </c:when>
                      <c:otherwise>
                        <c:out value="${history.deptCode}" default="진료과 미정" />
                      </c:otherwise>
                    </c:choose>
                  </p>
                </div>

                <div class="border-b border-hairline px-6 py-5 md:px-8">
                  <p class="text-body-sm text-ink-muted">담당 의료진</p>
                  <p class="mt-2 text-body-md text-ink-black">
                    <c:choose>
                      <c:when test="${not empty history.employeeName}">
                        <c:out value="${history.employeeName}" />
                      </c:when>
                      <c:otherwise>
                        <c:out value="${history.employeeCode}" default="의료진 미정" />
                      </c:otherwise>
                    </c:choose>
                  </p>
                </div>

                <div class="border-b border-hairline px-6 py-5 md:border-r md:px-8">
                  <p class="text-body-sm text-ink-muted">접수일</p>
                  <p class="mt-2 text-body-md text-ink-black">
                    <c:choose>
                      <c:when test="${not empty history.receiptDate}">
                        <fmt:formatDate value="${history.receiptDate}" pattern="yyyy.MM.dd" />
                      </c:when>
                      <c:otherwise>
                        -
                      </c:otherwise>
                    </c:choose>
                  </p>
                </div>

                <div class="border-b border-hairline px-6 py-5 md:px-8">
                  <p class="text-body-sm text-ink-muted">진료일</p>
                  <p class="mt-2 text-body-md text-ink-black">
                    <c:choose>
                      <c:when test="${not empty history.treatmentDate}">
                        <fmt:formatDate value="${history.treatmentDate}" pattern="yyyy.MM.dd" />
                      </c:when>
                      <c:otherwise>
                        진료일 미정
                      </c:otherwise>
                    </c:choose>
                  </p>
                </div>

                <div class="border-b border-hairline px-6 py-5 md:border-r md:px-8">
                  <p class="text-body-sm text-ink-muted">접수상태</p>
                  <p class="mt-2 text-body-md text-ink-black">
                    <c:out value="${history.receiptStatus}" default="상태 미정" />
                  </p>
                </div>

                <div class="border-b border-hairline px-6 py-5 md:px-8">
                  <p class="text-body-sm text-ink-muted">예약번호</p>
                  <p class="mt-2 text-body-md text-ink-black">
                    <c:out value="${history.reservationNo}" default="방문접수" />
                  </p>
                </div>

              </div>

            </div>

            <!-- 진료 기록 영역 -->
            <div class="grid grid-cols-1 gap-gutter lg:grid-cols-2">

              <section class="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 class="font-headline-2 text-headline-2 text-ink-black">
                  진료 내용
                </h2>

                <dl class="mt-4 divide-y divide-hairline">

                  <div class="py-4 first:pt-0">
                    <dt class="text-body-sm font-semibold text-ink-secondary">
                      증상 / 주관적 정보
                    </dt>

                    <dd class="mt-2 whitespace-pre-line text-body-md text-ink-black">
                      <c:out value="${history.registerS}" default="기록 없음" />
                    </dd>
                  </div>

                  <div class="py-4">
                    <dt class="text-body-sm font-semibold text-ink-secondary">
                      진찰 / 객관적 정보
                    </dt>

                    <dd class="mt-2 whitespace-pre-line text-body-md text-ink-black">
                      <c:out value="${history.registerO}" default="기록 없음" />
                    </dd>
                  </div>

                  <div class="py-4">
                    <dt class="text-body-sm font-semibold text-ink-secondary">
                      진단
                    </dt>

                    <dd class="mt-2 whitespace-pre-line text-body-md text-ink-black">
                      <c:out value="${history.registerA}" default="기록 없음" />
                    </dd>
                  </div>

                  <div class="py-4 last:pb-0">
                    <dt class="text-body-sm font-semibold text-ink-secondary">
                      치료 계획 / 처방
                    </dt>

                    <dd class="mt-2 whitespace-pre-line text-body-md text-ink-black">
                      <c:out value="${history.registerP}" default="기록 없음" />
                    </dd>
                  </div>

                </dl>
              </section>

              <section class="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 class="font-headline-2 text-headline-2 text-ink-black">
                  추가 정보
                </h2>

                <dl class="mt-4 divide-y divide-hairline">

                  <div class="py-4 first:pt-0">
                    <dt class="text-body-sm font-semibold text-ink-secondary">
                      에피소드명
                    </dt>

                    <dd class="mt-2 text-body-md text-ink-black">
                      <c:out value="${history.episodeName}" default="에피소드 정보 없음" />
                    </dd>
                  </div>

                  <div class="py-4">
                    <dt class="text-body-sm font-semibold text-ink-secondary">
                      질병코드
                    </dt>

                    <dd class="mt-2 text-body-md text-ink-black">
                      <c:out value="${history.diseaseCode}" default="-" />
                    </dd>
                  </div>

                  <div class="py-4">
                    <dt class="text-body-sm font-semibold text-ink-secondary">
                      투약금액
                    </dt>

                    <dd class="mt-2 text-body-md text-ink-black">
                      <c:choose>
                        <c:when test="${not empty history.medicationAmount}">
                          <fmt:formatNumber value="${history.medicationAmount}" pattern="#,###" />원
                        </c:when>
                        <c:otherwise>
                          -
                        </c:otherwise>
                      </c:choose>
                    </dd>
                  </div>

                  <div class="py-4 last:pb-0">
                    <dt class="text-body-sm font-semibold text-ink-secondary">
                      에피소드 ID
                    </dt>

                    <dd class="mt-2 text-body-md text-ink-black">
                      <c:out value="${history.episodeId}" default="-" />
                    </dd>
                  </div>

                </dl>
              </section>

            </div>

            <!-- 버튼 영역 -->
            <div class="flex flex-wrap justify-center gap-3">
              <a class="inline-flex items-center border border-primary bg-primary px-6 py-3 text-body-md text-on-primary transition-opacity hover:opacity-90"
                 href="${ctx}/patient/mypage?tab=history}">
                진료이력 목록
              </a>

              <a class="inline-flex items-center border border-hairline bg-canvas-white px-6 py-3 text-body-md text-ink-black transition-colors hover:border-primary hover:text-primary"
                 href="${ctx}/patient/mypage">
                마이페이지
              </a>
            </div>

          </section>

        </c:otherwise>

      </c:choose>

    </div>
  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>

</body>
</html>