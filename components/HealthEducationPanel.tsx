"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";

import imageA from "@/app/image/a.png";
import imageB from "@/app/image/b.png";
import imageC from "@/app/image/c.png";
import imageD from "@/app/image/d.png";

type ImageBlock = {
  src: StaticImageData;
  alt: string;
  label: string;
};

type InfoBlock =
  | { kind: "text"; value: string }
  | { kind: "image"; image: ImageBlock }
  | { kind: "imageRow"; images: ImageBlock[] };

type InfoSection = {
  id: string;
  title: string;
  blocks: InfoBlock[];
};

const infoSections: InfoSection[] = [
  {
    id: "alcohol",
    title: "주제 1: 음주와 암",
    blocks: [
      {
        kind: "text",
        value: String.raw`술, 얼마나 마시면 암 걸릴까?
 
음주와 암
 
암 예방을 위한 '안전한 음주량'은 없다. 단 한 잔의 술도 암 발생 위험을 높일 수 있다.
 
과거에는 '적당한 음주'가 심혈관 질환 예방에 도움이 된다는 인식이 있었지만, 암에 있어서는 이야기가 다르다. 세계보건기구(WHO) 산하 국제암연구소(IARC)는 술의 주성분인 알코올과 그 대사산물인 아세트알데히드를 1군(Group 1) 발암물질로 지정하고 있다.`,
      },
      {
        kind: "image",
        image: {
          src: imageB,
          alt: "음주와 암 관련 인포그래픽 A",
          label: "A",
        },
      },
      {
        kind: "text",
        value: String.raw` 
 
                

본 도표는 우리나라 사람들의 음주 실태를 나타내고 있다. 금주를 하고 있는 비율은 24% 정도로 굉장히 낮은 수치를 보이고 있는 것을 알 수 있다. 단 한잔의 술도 발암 물질로 작용할 수 있는 과학적 근거가 존재하기 때문에, 주의가 필요할 것으로 보인다.
 
 
음주가 암을 일으키는 원리
 
우리 몸에 들어온 알코올은 간에서 아세트알데히드라는 독성 물질로 분해된다. 이 아세트알데히드가 세포의 DNA를 직접 손상시키고, 세포의 정상적인 복구 과정을 방해하여 암세포가 발생할 위험을 높인다. 음주는 특히 구강암, 인두암, 후두암, 식도암, 간암, 대장암, 유방암 등의 발생 위험을 직접적으로 높인다. 마시는 술의 양이 많을수록, 그리고 음주 기간이 길수록 위험도는 비례하여 증가한다.
 
 
어떻게 예방 할 수 있을까?
 
'암에 걸리는 특정 음주량'은 정해져 있지 않으며, 암 예방을 위한 최선의 선택은 '금주' 또는 '절주'를 통해 총 음주량을 최소화하는 것이다.`,
      },
    ],
  },
  {
    id: "sunscreen",
    title: "주제 2: 자외선과 피부암",
    blocks: [
      {
        kind: "text",
        value: String.raw`선크림, 안 바르면 정말 암에 걸릴까?
 
자외선 노출과 피부암
 
대다수의 피부암은 자외선 노출로 인해 발생합니다. 구체적으로, **흑색종(melanoma)**의 약 86%가 자외선(UV) 노출과 관련이 있다는 연구 결과가 있습니다. 자외선은 피부 세포의 DNA를 직접적으로 손상시킵니다. 이 손상이 누적되면 세포의 유전자에 돌연변이를 일으키고, 비정상적인 세포 증식으로 이어져 결국 암이 됩니다.
 
피부암은 기저세포암(Basal Cell Carcinoma), 편평세포암(Squamous Cell Carcinoma), 그리고 가장 치명적인 **흑색종(Melanoma)**으로 나뉘는데, 이 세 가지 모두 자외선 노출과 깊은 관련이 있습니다.
 
선크림과 피부암 예방
 
이러한 피부암, 선크림으로 막을 수 있습니다. 선크림은 피부암 예방의 핵심 도구이며, 자외선을 흡수하거나 반사하여 피부 세포의 손상을 막는 역할을 합니다. 미국 피부암 재단(The Skin Cancer Foundation)에 따르면, SPF 15 이상의 선크림을 매일 꾸준히 사용하면 편평세포암(SCC) 위험을 약 40%, 흑색종 위험을 **50%**까지 낮출 수 있습니다.`,
      },
      {
        kind: "image",
        image: {
          src: imageC,
          alt: "선크림 사용과 피부암 예방 관련 인포그래픽 B",
          label: "B",
        },
      },
      {
        kind: "text",
        value: String.raw` 
                         

                
우리나라의 경우, 본 원 그래프를 보면 실제로 선크림을 자주 바르는 사람들의 비율이 50프로를 넘지 않는다. 즉, 사람들이 선크림을 통한 건강 관리의 중요성에 대해 생각할 필요가 있어 보인다.
 
그러면 선크림을 어떻게 발라야 할까요?
 
충분한 양 바르기: 대부분의 사람들은 권장량의 절반 정도만 바르는 경향이 있습니다. 성인의 경우, 몸 전체에 바를 때 소주잔 한 잔(약 35ml) 정도의 충분한 양을 바르는 것이 좋습니다. 얼굴에는 두 손가락 길이만큼 짜서 바르는 것이 효과적입니다.
 
자주 덧바르기: 선크림은 땀이나 물, 마찰에 의해 쉽게 지워집니다. 야외 활동 시에는 최소 2시간마다 한 번씩 덧바르는 것이 좋습니다. 물놀이나 땀을 많이 흘린 후에는 즉시 다시 발라야 합니다.`,
      },
    ],
  },
  {
    id: "fine-dust",
    title: "주제 3: 미세먼지와 폐암 위험",
    blocks: [
      {
        kind: "text",
        value: String.raw`미세먼지 많은 날 마스크 안 쓰면 암 걸릴까?
 
 
미세먼지, 암의 원인?
 
미세먼지 많은 날 마스크를 한 번 안 썼다고 바로 암에 걸리는 것은 아니지만, 장기적이고 반복적인 노출은 폐암 발생 위험을 분명히 높인다.`,
      },
      {
        kind: "imageRow",
        images: [
          {
            src: imageC,
            alt: "미세먼지와 폐암 위험 관련 인포그래픽 C",
            label: "A",
          },
          {
            src: imageD,
            alt: "미세먼지 마스크 착용 통계 인포그래픽 D",
            label: "D",
          },
        ],
      },
      {
        kind: "text",
        value: String.raw`                                                  

          

 
 
위의 표들을 보면, 우리나라의 미세먼지 농도가 다른 나라들에 비해 엄청 높은데도 불구하고, 마스크 착용 비율은 50%를 채 넘지 않는 것을 볼 수 있다. 마스크 착용에 대한 인식 변화가 필요할 것으로 보인다.
 
 
미세먼지가 암을 일으키는 원리
 
 
세먼지, 특히 지름 2.5µm 이하의 초미세먼지(PM2.5)는 입자가 매우 작아 코나 기관지에서 걸러지지 않고 폐 가장 깊숙한 곳까지 침투할 수 있다. 이 작은 입자들이 폐 세포에 박혀 만성적인 염증을 일으키고, 세포에 산화 스트레스를 주어 DNA 변이를 유발함으로써 암 발생 위험을 높인다. 미세먼지는 여러 질환의 원인이 되지만, 암 중에서는 특히 폐암과의 연관성이 가장 명확하게 밝혀져 있다.
 
 
어떻게 예방할 수 있을까?
 
미세먼지 농도가 높은 날 마스크를 착용하지 않는 습관이 반복되면, 나도 모르는 사이에 발암물질을 지속적으로 흡입하여 폐암 발생의 누적 위험도를 높이는 것과 같다. 일회성 사건이 아닌, '장기적인 노출 총량'이 중요한 문제이다. 보건용 마스크(KF80, KF94 등)는 이러한 미세먼지 입자를 효과적으로 걸러주어 폐를 보호하는 가장 기본적인 수단이다.`,
      },
    ],
  },
  {
    id: "sleep",
    title: "주제 4: 수면과 암 위험",
    blocks: [
      {
        kind: "text",
        value: String.raw`수면 부족, 정말 암의 원인이 될까?
 
🔹 1. 결론부터 말하자면
단기간의 수면 부족만으로 암이 직접 발생하는 것은 아닙니다. 그러나 지속적인 수면 부족은 암세포가 생기고 자라기 쉬운 환경을 만드는 주요 위험 요인으로 밝혀져 있습니다.
 
🔹 2. 과학적 근거
인간의 몸은 약 24시간 주기로 움직이는 생체 시계(Circadian Rhythm) 를 가지고 있습니다.
이 리듬은 호르몬 분비, DNA 복구, 면역 활동을 일정하게 유지하도록 돕습니다. 수면이 부족하거나 불규칙할 경우, 이 리듬이 깨지면서 세포의 정상적인 회복 과정이 방해받습니다.
 
🔹 3. 주요 영향 기전
멜라토닌 감소
멜라토닌은 밤에 분비되는 호르몬으로, 항산화 및 항암 작용을 수행합니다.
수면 부족 시 멜라토닌 분비가 감소하여, 암세포의 성장을 억제하는 능력이 저하됩니다.
면역 기능 저하
수면은 면역세포가 암세포를 감시하고 제거하는 능력을 유지하는 데 필수적입니다.
수면 부족은 이러한 면역 감시 기능(immune surveillance) 을 약화시켜, 돌연변이 세포가 자라기 쉽게 만듭니다.
DNA 복구 지연
정상 세포는 손상된 DNA를 수면 중 복구합니다. 수면이 불충분하면 유전자 손상이 누적되어 암 발생 확률이 증가합니다.
 
🔹 4. 연구 결과
야간 교대근무자는 일반인보다 유방암·전립선암의 발병률이 높다는 역학 연구가 다수 존재합니다.
세계보건기구(WHO) 산하 국제암연구소(IARC) 는 2019년,
“야간 교대근무(Shift work involving circadian disruption)”
를 Group 2A 발암 요인(인간에게 발암 가능성이 높은 요인) 으로 공식 분류하였습니다.
🔹 5. 정리
수면 부족은 ‘즉각적인 발암 요인’은 아니지만, 호르몬·면역·유전자 복구 과정에 악영향을 주어 암 발생 위험을 높입니다. 즉, “잠은 휴식이 아니라 세포를 지키는 방패막” 입니다.`,
      },
    ],
  },
  {
    id: "charred-food",
    title: "주제 5: 탄 음식과 발암물질",
    blocks: [
      {
        kind: "text",
        value: String.raw`탄 음식, 정말 암을 유발할까?
🔹 1. 결론부터 말하자면
예, 장기적으로는 발암 위험이 있습니다.
음식이 탄 부분에는 인체에 유해한 발암성 화학물질이 생성됩니다.
다만 가끔 먹는 정도로는 큰 문제가 되지 않지만, 습관적으로 섭취할 경우 위험이 누적될 수 있습니다.
🔹 2. 주요 발암물질
탄 음식이 생길 때 생성되는 대표적인 물질은 다음과 같습니다.
물질명 종류 특징 발암성 분류 (IARC 기준)
벤조[a]피렌 (Benzo[a]pyrene) 다환방향족탄화수소(PAHs) 불완전 연소 시 생성, DNA 손상 유발 Group 1 (인간에 발암 확인)
헤테로사이클릭아민 (HCA) 고단백 식품이 고온에서 가열될 때 생성 DNA 변이 및 돌연변이 촉진 Group 1 (인간에 발암 확인)
🔹 3. 인체 내 작용 메커니즘
DNA 결합 및 손상
위 물질들은 체내에서 대사활성화(activation) 과정을 거쳐
DNA에 직접 결합해 돌연변이(mutation) 를 일으킵니다.
발암 진행 촉진
반복 노출 시 세포 내 유전자 변이 누적,
암 억제 유전자(p53 등) 손상,
세포 증식 조절 이상 등이 발생합니다.
간 대사 부담 증가
발암물질은 간에서 해독되지만,
지속적인 섭취는 간의 해독 효소에 부담을 주어 체내 독성 축적을 유발할 수 있습니다.
🔹 4. 조리 방식에 따른 차이
조리 방식 발암물질 생성 정도 비고
직화구이 (숯불, 그릴) 높음 기름이 불에 떨어지며 연기 속 PAHs가 음식에 흡착
프라이팬 고온 조리 중간 표면 갈변(마이야르 반응) 시 HCA 일부 생성
삶기·찌기·조림 등 낮음 100℃ 이하, 발암물질 생성 거의 없음
🔹 5. 예방 및 섭취 시 주의사항
고기는 타지 않게 굽고, 탄 부분은 제거합니다.
직화 대신 오븐·찜·삶기 조리법을 이용하면 안전합니다.
고기와 함께 채소·과일을 섭취하면 항산화제가 발암물질의 영향을 줄입니다.
기름이 불에 떨어지는 상황(연기 발생)은 최소화합니다.
🔹 6. 정리
탄 음식은 즉각적인 독성은 없지만, DNA 손상을 누적시키는 발암성 물질을 포함합니다.
따라서 **“불맛은 살리고, 탄맛은 피하라”**는 조언은 과학적 근거가 있는 말입니다.`,
      },
    ],
  },
];

export default function HealthEducationPanel() {
  return (
    <section className="card space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">
          생활습관과 암 예방 정보
        </h2>
        <p className="text-sm text-slate-600">
          생활 습관과 환경적 요인이 암 발생 위험에 어떤 영향을 줄 수 있는지에
          대한 자료입니다. 각 주제를 눌러 자세한 설명을 확인하세요.
        </p>
      </div>
      <div className="space-y-4">
        {infoSections.map((section) => (
          <InfoItem key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}

function InfoItem({ section }: { section: InfoSection }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="rounded-2xl border border-slate-200/60 bg-slate-50/80 p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="badge">정보</span>
          <h3 className="text-lg font-semibold text-slate-900">
            {section.title}
          </h3>
        </div>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={`info-${section.id}`}
        >
          {open ? "접기" : "자세히"}
        </button>
      </div>
      {open && (
        <div
          id={`info-${section.id}`}
          className="mt-4 space-y-5 rounded-xl border border-emerald-100 bg-white/80 p-4 text-slate-700 leading-relaxed"
        >
          {section.blocks.map((block, index) => {
            if (block.kind === "text") {
              return (
                <div key={index} className="whitespace-pre-wrap">
                  {block.value}
                </div>
              );
            }
            if (block.kind === "image") {
              return (
                <figure
                  key={index}
                  className="flex flex-col items-center gap-3"
                >
                  <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
                    이미지 {block.image.label}
                  </span>
                  <Image
                    src={block.image.src}
                    alt={block.image.alt}
                    className="w-full max-w-2xl rounded-xl border border-slate-200/70 bg-white object-cover"
                  />
                </figure>
              );
            }
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-6 sm:flex-row"
              >
                {block.images.map((image) => (
                  <figure
                    key={image.label}
                    className="flex w-full max-w-sm flex-col items-center gap-3"
                  >
                    <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
                      이미지 {image.label}
                    </span>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="w-full rounded-xl border border-slate-200/70 bg-white object-cover"
                    />
                  </figure>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}
