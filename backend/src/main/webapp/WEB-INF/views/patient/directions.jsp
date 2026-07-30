<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<c:set var="activeTab" value="subway" />

<c:if test="${not empty param.transport}">
  <c:set var="activeTab" value="${param.transport}" />
</c:if>

<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8" />

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0" />

  <title>오시는길 | MediBridge</title>

  <link rel="stylesheet"
        href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>

<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <%@ include file="common/header.jsp" %>

  <main class="flex-1 py-12 md:py-16">

    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <!-- 페이지 제목 -->
      <header class="mb-8">

        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          오시는길
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          메디브릿지 병원으로 오시는 길과 교통·주차 안내를 확인하실 수 있습니다.
        </p>

      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <!-- 왼쪽 주요 콘텐츠 -->
        <div class="space-y-gutter lg:col-span-2">

          <!-- 카카오맵 -->
          <section class="overflow-hidden border border-hairline bg-canvas-white">

            <div class="border-b border-hairline bg-surface-container-low px-6 py-4">

              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                위치 안내
              </h2>

            </div>

            <div class="relative aspect-[16/9] w-full overflow-hidden bg-surface-container-low md:aspect-[21/9]">

              <div id="kakaoMap"
                   class="absolute inset-0 h-full w-full"
                   aria-label="메디브릿지 병원 위치 지도">
              </div>

              <!-- 카카오맵 출력 실패 시 표시 -->
              <div id="mapFallback"
                   class="absolute inset-0 hidden flex-col items-center justify-center bg-surface-container-low px-6 text-center">

                <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary">

                  <span class="text-3xl">
                    📍
                  </span>

                </div>

                <p class="font-headline-2 text-headline-2 text-ink-black">
                  지도를 불러오지 못했습니다.
                </p>

                <p class="mt-3 text-body-sm text-ink-secondary">
                  아래 카카오맵 버튼을 이용해 병원 위치를 확인해 주세요.
                </p>

              </div>

            </div>

            <!-- 외부 지도 버튼 -->
            <div class="flex flex-wrap gap-3 border-t border-hairline px-6 py-4">

              <a class="inline-flex items-center gap-2 border border-hairline px-4 py-2 text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                 href="https://map.kakao.com/link/search/대전광역시%20서구%20한밭대로%20755"
                 target="_blank"
                 rel="noopener noreferrer">
                카카오맵
              </a>

            </div>

          </section>

          <!-- 교통 및 주차 안내 -->
          <section class="border border-hairline bg-canvas-white p-6 md:p-8">

            <!-- 탭 메뉴 -->
            <div class="mb-6 flex flex-wrap gap-2 border-b border-hairline">

              <a href="${ctx}/patient/directions?transport=subway"
                 class="-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-body-md transition-colors
                 ${activeTab eq 'subway'
                   ? 'border-primary text-primary'
                   : 'border-transparent text-ink-secondary hover:text-ink-black'}">
                지하철
              </a>

              <a href="${ctx}/patient/directions?transport=bus"
                 class="-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-body-md transition-colors
                 ${activeTab eq 'bus'
                   ? 'border-primary text-primary'
                   : 'border-transparent text-ink-secondary hover:text-ink-black'}">
                버스
              </a>

              <a href="${ctx}/patient/directions?transport=car"
                 class="-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-body-md transition-colors
                 ${activeTab eq 'car'
                   ? 'border-primary text-primary'
                   : 'border-transparent text-ink-secondary hover:text-ink-black'}">
                자가용
              </a>

              <a href="${ctx}/patient/directions?transport=parking"
                 class="-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-body-md transition-colors
                 ${activeTab eq 'parking'
                   ? 'border-primary text-primary'
                   : 'border-transparent text-ink-secondary hover:text-ink-black'}">
                주차
              </a>

            </div>

            <c:choose>

              <c:when test="${activeTab eq 'subway'}">

                <div class="space-y-4">

                  <article class="border border-hairline p-5">

                    <h3 class="font-title text-title text-ink-black">
                      대전 도시철도 1호선 정부청사역
                    </h3>

                    <p class="mt-2 text-body-md text-primary">
                      정부청사역 하차
                    </p>

                    <p class="mt-1 text-body-md text-ink-black">
                      도보 약 5분
                    </p>

                    <p class="mt-2 text-body-sm text-ink-secondary">
                      정부청사역에서 한밭대로 방향으로 이동하면
                      메디브릿지 병원을 찾을 수 있습니다.
                    </p>

                  </article>

                  <article class="border border-hairline p-5">

                    <h3 class="font-title text-title text-ink-black">
                      대전 도시철도 1호선 시청역
                    </h3>

                    <p class="mt-2 text-body-md text-primary">
                      시청역 하차
                    </p>

                    <p class="mt-1 text-body-md text-ink-black">
                      정부청사역 방향으로 이동
                    </p>

                    <p class="mt-2 text-body-sm text-ink-secondary">
                      시청역에서 정부청사역 방면으로 이동한 뒤
                      한밭대로를 따라 병원으로 오실 수 있습니다.
                    </p>

                  </article>

                </div>

              </c:when>

              <c:when test="${activeTab eq 'bus'}">

                <div class="overflow-x-auto">

                  <table class="w-full min-w-[520px] border-collapse">

                    <thead>

                      <tr class="bg-surface-container-low">

                        <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                          정류장
                        </th>

                        <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                          노선 안내
                        </th>

                        <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                          병원까지
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      <tr>

                        <td class="border border-hairline px-4 py-4 text-body-md text-ink-black">
                          정부청사역
                        </td>

                        <td class="border border-hairline px-4 py-4 text-body-sm text-ink-secondary">
                          정부청사역을 경유하는 시내버스 이용
                        </td>

                        <td class="border border-hairline px-4 py-4 text-body-sm text-ink-secondary">
                          하차 후 한밭대로 방향 도보 약 5분
                        </td>

                      </tr>

                      <tr>

                        <td class="border border-hairline px-4 py-4 text-body-md text-ink-black">
                          정부대전청사 인근 정류장
                        </td>

                        <td class="border border-hairline px-4 py-4 text-body-sm text-ink-secondary">
                          둔산동·정부청사 방면 시내버스 이용
                        </td>

                        <td class="border border-hairline px-4 py-4 text-body-sm text-ink-secondary">
                          하차 후 정부청사역 방향 도보 이동
                        </td>

                      </tr>

                      <tr>

                        <td class="border border-hairline px-4 py-4 text-body-md text-ink-black">
                          선사유적지 인근 정류장
                        </td>

                        <td class="border border-hairline px-4 py-4 text-body-sm text-ink-secondary">
                          월평동·둔산동 방면 시내버스 이용
                        </td>

                        <td class="border border-hairline px-4 py-4 text-body-sm text-ink-secondary">
                          하차 후 한밭대로 방향 도보 이동
                        </td>

                      </tr>

                    </tbody>

                  </table>

                  <p class="mt-4 text-body-sm text-ink-secondary">
                    버스 번호와 도착 시간은 운행 상황에 따라 달라질 수 있으므로
                    카카오맵 실시간 길찾기를 확인해 주세요.
                  </p>

                </div>

              </c:when>

              <c:when test="${activeTab eq 'car'}">

                <div class="space-y-4">

                  <article class="border border-hairline p-5">

                    <h3 class="font-title text-title text-ink-black">
                      유성·월평동 방면
                    </h3>

                    <p class="mt-2 text-body-md text-ink-secondary">
                      월평동 방면에서 한밭대로로 진입한 뒤
                      정부청사역 방향으로 이동합니다.
                    </p>

                  </article>

                  <article class="border border-hairline p-5">

                    <h3 class="font-title text-title text-ink-black">
                      대전시청·둔산동 방면
                    </h3>

                    <p class="mt-2 text-body-md text-ink-secondary">
                      둔산대로를 이용해 정부대전청사 방면으로 이동한 뒤
                      한밭대로로 진입합니다.
                    </p>

                  </article>

                  <article class="border border-hairline p-5">

                    <h3 class="font-title text-title text-ink-black">
                      내비게이션 이용
                    </h3>

                    <p class="mt-2 text-body-md text-ink-secondary">
                      내비게이션에 ‘대전광역시 서구 한밭대로 755’를
                      입력하면 병원 위치를 확인할 수 있습니다.
                    </p>

                  </article>

                </div>

              </c:when>

              <c:when test="${activeTab eq 'parking'}">

                <div class="space-y-5">

                  <p class="mb-8 flex gap-2 text-body-md font-semibold text-ink-black">
                    차량 이용 시 건물 주차장을 이용해 주세요.
                    주차 공간이 제한될 수 있어 대중교통 이용을 권장합니다.
                  </p>

                  <dl class="space-y-4 text-body-md">

                    <div>

                      <dt class="mb-1 text-body-sm font-semibold text-ink-black">
                        주차장 위치
                      </dt>

                      <dd class="text-ink-secondary">
                        병원 건물 지하주차장
                      </dd>

                    </div>

                    <div>

                      <dt class="mb-1 text-body-sm font-semibold text-ink-black">
                        이용 시간
                      </dt>

                      <dd class="text-ink-secondary">
                        병원 진료시간 내 이용 가능
                      </dd>

                    </div>

                    <div>

                      <dt class="mb-1 text-body-sm font-semibold text-ink-black">
                        주차 지원
                      </dt>

                      <dd class="text-ink-secondary">
                        진료 환자 주차 지원은 원무창구 안내를 확인해 주세요.
                      </dd>

                    </div>

                  </dl>

                  <ul class="space-y-2 border-t border-hairline pt-4 text-body-sm text-ink-secondary">

                    <li>
                      · 진료 후 원무창구에서 주차 확인을 받아주세요.
                    </li>

                    <li>
                      · 혼잡 시간에는 주차 대기가 발생할 수 있습니다.
                    </li>

                    <li>
                      · 장애인·임산부 전용 주차구역을 우선 이용해 주세요.
                    </li>

                  </ul>

                </div>

              </c:when>

              <c:otherwise>

                <div class="py-12 text-center">

                  <p class="text-body-md text-ink-secondary">
                    교통 안내 정보를 확인할 수 없습니다.
                  </p>

                </div>

              </c:otherwise>

            </c:choose>

          </section>

        </div>

        <!-- 오른쪽 병원 정보 -->
        <aside class="h-fit space-y-gutter lg:sticky lg:top-28">

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">

            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
              병원 정보
            </h2>

            <dl class="space-y-4 text-body-md">

              <div>

                <dt class="mb-1 text-body-sm text-ink-secondary">
                  병원명
                </dt>

                <dd class="text-ink-black">
                  메디브릿지 병원
                </dd>

              </div>

              <div>

                <dt class="mb-1 text-body-sm text-ink-secondary">
                  주소
                </dt>

                <dd class="text-ink-black">
                  (35209) 대전광역시 서구 한밭대로 755
                </dd>

              </div>

              <div>

                <dt class="mb-1 text-body-sm text-ink-secondary">
                  대표전화
                </dt>

                <dd class="text-ink-black">
                  1588-1234
                </dd>

              </div>

              <div>

                <dt class="mb-1 text-body-sm text-ink-secondary">
                  팩스
                </dt>

                <dd class="text-ink-black">
                  042-123-4567
                </dd>

              </div>

            </dl>

          </div>

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">

            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
              이용 안내
            </h2>

            <ul class="space-y-3 text-body-sm text-ink-secondary">

              <li>
                · 대중교통 이용을 권장합니다.
              </li>

              <li>
                · 외래 진료: 평일 09:00 ~ 18:00
              </li>

              <li>
                · 토요일 진료: 09:00 ~ 13:00
              </li>

            </ul>

          </div>

        </aside>

      </div>

    </div>

  </main>

  <%@ include file="common/footer.jsp" %>

</div>

<%--
  카카오맵 JavaScript SDK

  libraries=services:
  입력한 도로명 주소를 위도·경도로 변환하기 위해 필요하다.

  autoload=false:
  SDK가 준비된 뒤 kakao.maps.load()를 통해 지도를 생성한다.
--%>
<script
  type="text/javascript"
  src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=97bc31c13c78b4cd109b107a632cb54d&libraries=services&autoload=false">
</script>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const hospitalName =
      "메디브릿지 병원";

    const hospitalAddress =
      "대전광역시 서구 한밭대로 755";

    const mapContainer =
      document.getElementById("kakaoMap");

    const mapFallback =
      document.getElementById("mapFallback");

    /*
     * 카카오맵 출력 실패 화면 표시
     */
    function showMapFallback(message, error) {

      if (message) {

        if (error) {
          console.error(message, error);
        } else {
          console.error(message);
        }
      }

      if (mapFallback) {
        mapFallback.classList.remove("hidden");
        mapFallback.classList.add("flex");
      }
    }

    /*
     * 지도 영역 확인
     */
    if (!mapContainer) {

      showMapFallback(
        "카카오맵 출력 영역을 찾을 수 없습니다."
      );

      return;
    }

    /*
     * 카카오맵 SDK 로드 여부 확인
     */
    if (typeof window.kakao === "undefined"
        || !window.kakao.maps
        || typeof window.kakao.maps.load !== "function") {

      showMapFallback(
        "카카오맵 SDK를 불러오지 못했습니다. "
        + "JavaScript 키, 등록 도메인, 카카오맵 사용 설정을 확인해 주세요."
      );

      return;
    }

    /*
     * SDK가 준비된 뒤 지도 생성
     */
    window.kakao.maps.load(function () {

      try {

        /*
         * 도로명 주소를 위도·경도로 변환한다.
         *
         * 좌표를 직접 하드코딩하지 않기 때문에
         * 병원 주소를 변경할 때 hospitalAddress만 수정하면 된다.
         */
        const geocoder =
          new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          hospitalAddress,
          function (result, status) {

            if (status
                !== window.kakao.maps.services.Status.OK
                || !result
                || result.length === 0) {

              showMapFallback(
                "병원 주소를 지도 좌표로 변환하지 못했습니다."
              );

              return;
            }

            const hospitalPosition =
              new window.kakao.maps.LatLng(
                Number(result[0].y),
                Number(result[0].x)
              );

            const map =
              new window.kakao.maps.Map(
                mapContainer,
                {
                  center: hospitalPosition,
                  level: 3
                }
              );

            const marker =
              new window.kakao.maps.Marker({
                map: map,
                position: hospitalPosition
              });

            const infoWindow =
              new window.kakao.maps.InfoWindow({
                content:
                  '<div style="' +
                  'padding:10px 14px;' +
                  'min-width:230px;' +
                  'font-size:13px;' +
                  'line-height:1.5;' +
                  'text-align:center;' +
                  'white-space:nowrap;">' +
                  '<strong>' +
                  hospitalName +
                  '</strong><br>' +
                  '<span style="color:#666;">' +
                  hospitalAddress +
                  '</span>' +
                  '</div>'
              });

            infoWindow.open(map, marker);

            window.kakao.maps.event.addListener(
              marker,
              "click",
              function () {
                infoWindow.open(map, marker);
              }
            );

            window.addEventListener(
              "resize",
              function () {
                map.relayout();
                map.setCenter(hospitalPosition);
              }
            );

            console.log(
              "카카오맵이 정상적으로 표시되었습니다."
            );
          }
        );

      } catch (error) {

        showMapFallback(
          "카카오맵 생성 중 오류가 발생했습니다.",
          error
        );
      }
    });
  });
</script>

</body>
</html>