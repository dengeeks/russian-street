import { DirectionType } from '@/entities/direction/direction-item/model/type'

export const directionList: DirectionType[] = [
  {
    title: "Спорт",
    description: "Здесь нет жёстких правил и ограничений, здесь каждый может найти свой собственный путь и выразить свою индивидуальность. Это отличный способ не только поддерживать своё здоровье, но и обрести новых друзей, научиться преодолевать страхи и одерживать победы над самим собой.\n" +
      "Уличный спорт — это возможность выйти за пределы городских стен, исследовать новые места и ощутить себя живым и полным сил.",
    img: "/test/directions/1.png",
    sub_category: [
      { title: "паркур", slug: "parkur" },
      { title: "фриран", slug: "friran" },
      { title: "воркаут", slug: "workout" }
    ]
  },
  {
    title: "Музыка",
    description: "Уличная музыка оживляет города и превращает обычные улицы в концертные площадки. Это свобода самовыражения, импровизация и мощная энергия живого исполнения, которая сближает людей.",
    img: "/test/directions/2.png",
    sub_category: [
      { title: "рэп", slug: "rap" },
      { title: "битбокс", slug: "beatbox" },
      { title: "гитаристы", slug: "guitarists" }
    ]
  },
  {
    title: "Танцы",
    description: "Уличные танцы — это синтез культуры, эмоций и ритма. Они позволяют выразить себя через движение, рассказать историю без слов и создать атмосферу настоящего единения.",
    img: "/test/directions/3.png",
    sub_category: [
      { title: "брейк-данс", slug: "breakdance" },
      { title: "крамп", slug: "krump" },
      { title: "хаус", slug: "house" }
    ]
  },
  {
    title: "Граффити",
    description: "Граффити — это визуальный голос улиц. Это способ донести послание, украсить серые стены и оставить свой след в городской среде с помощью ярких красок и смелых форм.",
    img: "/test/directions/4.png",
    sub_category: [
      { title: "стрит-арт", slug: "street-art" },
      { title: "теги", slug: "tags" },
      { title: "муралы", slug: "murals" },
      { title: "брейк-данс", slug: "breakdance" },
      { title: "крамп", slug: "krump" },
      { title: "хаус", slug: "house" },
      { title: "рэп", slug: "rap" },
      { title: "битбокс", slug: "beatbox" },
      { title: "гитаристы", slug: "guitarists" },
      { title: "паркур", slug: "parkur" },
      { title: "фриран", slug: "friran" },
      { title: "воркаут", slug: "workout" }


    ]
  },
]
