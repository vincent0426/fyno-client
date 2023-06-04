import { useEffect, useState } from "react";
import Cat from '../images/cat.jpg'
import Turtle from '../images/turtle.jpg'
import axiosClient from "../utils/axiosClient";
import dog from "../images/dog.jpg";
import dog2 from "../images/dog2.jpg";
import dog3 from "../images/dog3.jpg";

const links = [
    { name: '動物保護資訊網', href: 'https://animal.coa.gov.tw/' },
    { name: '台灣流浪動物救援協會', href: 'https://thara.eoffering.org.tw/' },
    { name: '相信動物協會', href: 'https://www.faithforanimals.org.tw/volunteer?gclid=CjwKCAjwge2iBhBBEiwAfXDBR5DP-_H-Y42710R_arFpvWn_8OQcpzDOiWLXeGbeGORbN2ifcgyFshoCKFcQAvD_BwE' },
    { name: '世界自然基金會', href: 'https://www.worldwildlife.org/' },
]
const stats = [
    { name: '觀念沒有變，問題就不會改變', value: '人的腦袋沒有變，沒有結紮沒有領養，問題就是一直存在', src: Cat },
    { name: '動物保護不是科目 是一個生活的態度', value: '讓孩子們從小培養這個素養，以後養動物的態度就會不一樣', src: Turtle },
    { name: '期待動保教育 傳承新的未來', value: '動保的觀念，從大人開始，一代一代將新的觀念傳承下去', src: dog },
    { name: '視貓狗為家人，謹慎面對每次送養', value: '透過FYNO，幫浪浪找到真正的final home!', src: dog3 },
]

export default function Example() {
    return (
        <div className="relative isolate overflow-hidden bg-emerald-300/[.2] py-24 sm:py-32">
            <img
                src='https://source.unsplash.com/6GMq7AGxNbE'
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-30"
            />
            <div
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1097/845] w-[68.5625rem] opacity-20"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1097/845] w-[68.5625rem] opacity-20"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="bg-white">
                <iframe className="absolute right-8 top-24" width="500" height="280" src="https://www.youtube.com/embed/rw6F9MvOwKI?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <a className="absolute right-8 top-96 hover:underline hover:decoration-teal-600 hover:decoration-4 text-base font-semibold" href="https://www.youtube.com/results?search_query=%E6%B5%81%E6%B5%AA%E5%8B%95%E7%89%A9">更多影片<span aria-hidden="true">&rarr;</span></a>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">你知道嗎?</h2>
                    <p className="mt-10 text-lg max-w-xl leading-8 text-black font-bold">
                        全球每年有數百萬隻流浪動物面臨無家可歸的困境。些數量巨大的流浪動物對於社會和環境都帶來了壓力。
                    </p>
                    <p className="mt-10 text-lg leading-8 text-black font-semibold underline decoration-teal-600 decoration-4">
                        更多網站:
                    </p>
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-black sm:grid-cols-2 md:flex lg:gap-x-10">
                        {links.map((link) => (
                            <a key={link.name} href={link.href} target="_blank" className="hover:underline hover:decoration-teal-600 hover:decoration-4">
                                {link.name} <span aria-hidden="true">&rarr;</span>
                            </a>
                        ))}
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.name} className="rounded-xl shadow-xl transition-transform duration-500 transform group hover:rotate-y-12">
                                <div className="relative">
                                    <img alt="" className="rounded-xl object-cover h-96 w-80 shadow-xl shadow-black/40" src={stat.src} />
                                </div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white opacity-0 hover:opacity-90 transform rotate-y-180 text-center">
                                    <dd className="text-xl  leading-9 tracking-tight text-black text-center">{stat.name}:</dd>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight text-black text-center">{stat.value}</dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
