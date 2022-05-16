module.exports = {
  title: `adultlee.com`,
  description: `Study with Me`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://www.adultlee.com`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: ``, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: "0", // Google Analytics Tracking ID
  author: {
    name: `이성인`,
    bio: {
      role: `개발자`,
      description: [
        "배움에 진심을 다하는",
        "낭만을 즐길줄 아는",
        "나보단 우리가 좋은",
      ],
      thumbnail: "sample.jpeg", // Path to the image in the 'asset' folder
    },
    social: {
      github: ``, // `https://github.com/zoomKoding`,
      linkedIn: ``, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: ``, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: "",
        activity: "",
        links: {
          github: "",
          post: "",
          googlePlay: "",
          appStore: "",
          demo: "",
        },
      },
      // ========================================================
      // ========================================================
      {
        date: "2017.03 ~",
        activity: "인하대학교 정보통신공학과 재학",
      },
      {
        date: "2021.03 ~ 2021.12",
        activity: "멋쟁이 사자처럼 9기",
        links: {
          github: "https://github.com/LikeLion-Inha-9",
        },
      },
      {
        date: "2021.07 ~",
        activity: "(주) 마로마브 웹개발팀 ",
        links: {
          github: "https://github.com/EXIT-MAKE",
          googlePlay:
            "https://play.google.com/store/apps/details?id=com.CEREALLAB.FruitsLoop",
          appStore:
            "https://apps.apple.com/kr/app/make-%EB%A9%94%EC%9D%B4%ED%81%AC-%EB%A9%94%EC%9D%B4%EC%BB%A4-%EC%BD%94%EB%94%A9-%EA%B5%90%EC%9C%A1-%EC%89%BD%EA%B3%A0-%EC%9E%AC%EB%B0%8C%EA%B2%8C/id1477837489",
          demo: "https://www.trymake.co/",
        },
      },
      {
        date: "2022.03 ~ ",
        activity: "멋쟁이 사자처럼 10기 (FE)운영진",
        links: {
          github: "https://github.com/Likelion-Inha-10",
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: "",
        description: "",
        techStack: ["", ""],
        thumbnailUrl: "",
        links: {
          post: "",
          github: "",
          googlePlay: "",
          appStore: "",
          demo: "",
        },
      },
      // ========================================================
      // ========================================================
      // {
      //   title: "개발 블로그 테마 개발",
      //   description:
      //     "개발 블로그를 운영하는 기간이 조금씩 늘어나고 점점 많은 생각과 경험이 블로그에 쌓아가면서 제 이야기를 담고 있는 블로그를 직접 만들어보고 싶게 되었습니다. 그동안 여러 개발 블로그를 보면서 좋았던 부분과 불편했던 부분들을 바탕으로 레퍼런스를 참고하여 직접 블로그 테마를 만들게 되었습니다.",
      //   techStack: ["gatsby", "react"],
      //   thumbnailUrl: "blog.png",
      //   links: {
      //     post: "/gatsby-starter-zoomkoding-introduction",
      //     github: "https://github.com/zoomkoding/zoomkoding-gatsby-blog",
      //     demo: "https://www.zoomkoding.com",
      //   },
      // },
    ],
  },
};
