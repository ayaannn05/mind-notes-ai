"use client";
import React, { useState } from "react";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronRight } from "react-icons/rx";
import { FiFeather, FiBox, FiCpu, FiGlobe, FiLayers, FiZap } from "react-icons/fi";

export const Layout508 = (props) => {
    const { tagline, heading, description, defaultValue, tabs } = {
        ...Layout508Defaults,
        ...props,
    };
    const [activeTab, setActiveTab] = useState(defaultValue);
    const MotionTabsContent = motion.create(TabsContent);

    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container">
          <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            <p className="mb-3 font-semibold text-teal-600 md:mb-4">{tagline}</p>
            <h1 className="mb-5 text-5xl font-bold text-teal-600 md:mb-6 md:text-7xl lg:text-8xl">{heading}</h1>
            <p className="md:text-md text-slate-600">{description}</p>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-1 gap-x-12 rounded-2xl bg-white shadow-xl border border-teal-100 lg:gap-x-0 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="grid">
              <TabsList className="order-2 flex-col md:order-1 md:flex-row bg-gradient-to-r from-teal-50 to-yellow-50">
                {tabs.map((tab, index) => (
                  <TabsTrigger
                    key={index}
                    value={tab.value}
                    className="flex w-full items-start justify-start gap-4 whitespace-normal border-0 border-t p-6 text-md font-bold leading-[1.4] duration-300 hover:bg-gradient-to-r hover:from-teal-50 hover:to-yellow-50 data-[state=active]:bg-white data-[state=active]:text-teal-600 md:items-center md:justify-center md:border-b md:border-r md:border-t-0 md:px-8 md:py-6 md:text-xl md:last-of-type:border-r-0 md:data-[state=active]:[border-bottom:2px_solid_#2A9D8F] transition-all"
                  >
                    {getTabIcon(index)}
                    {tab.trigger}
                  </TabsTrigger>
                ))}
              </TabsList>
              <AnimatePresence initial={false}>
                {tabs.map((tab) => (
                  <MotionTabsContent
                    key={tab.value}
                    value={tab.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: activeTab === tab.value ? 1 : 0, y: activeTab === tab.value ? 0 : 20 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="order-1 md:order-2"
                  >
                    <FeatureCard tab={tab} />
                  </MotionTabsContent>
                ))}
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </section>
    );
};

const FeatureCard = ({ tab }) => {
    return (
      <div className="grid grid-cols-1 gap-y-12 p-6 md:grid-cols-2 md:items-center md:gap-x-12 md:p-8 lg:gap-x-20 lg:p-12  rounded-lg hover:bg-gradient-to-br hover:from-teal-50/30 hover:to-yellow-50/30 transition-all duration-300">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-yellow-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src={tab.content.image.src}
            className="w-full object-cover rounded-2xl shadow-lg transform group-hover:scale-[1.02] transition-transform duration-300"
            alt={tab.content.image.alt}
          />
        </div>
        <div className="space-y-6">
          <p className="mb-3 font-semibold text-teal-600 md:mb-4">{tab.content.tagline}</p>
          <h2 className="rb-5 mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
            {tab.content.heading}
          </h2>
          <p className="text-slate-600">{tab.content.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            {tab.content.buttons.map((button, index) => (
              <Button
                key={index}
                {...button}
                className="transform hover:scale-105 transition-transform duration-300 hover:shadow-md"
              >
                {button.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
};

const getTabIcon = (index) => {
    const icons = [
        <FiFeather className="w-6 h-6 text-teal-500" />,
        <FiBox className="w-6 h-6 text-teal-500" />,
        <FiCpu className="w-6 h-6 text-teal-500" />,
        <FiGlobe className="w-6 h-6 text-teal-500" />,
        <FiLayers className="w-6 h-6 text-teal-500" />,
        <FiZap className="w-6 h-6 text-teal-500" />,
    ];
    return icons[index] || icons[0];
};

export const Layout508Defaults = {
    tagline: "Tagline",
    heading: "Short heading goes here",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    defaultValue: "tab-1",
    tabs: [
        {
            value: "tab-1",
            trigger: "Tab one",
            content: {
                tagline: "Tagline",
                heading: "Medium length section heading goes here",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
                buttons: [
                    { title: "Button", variant: "secondary" },
                    {
                        title: "Button",
                        variant: "link",
                        size: "link",
                        iconRight: <RxChevronRight />,
                    },
                ],
                image: {
                    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
                    alt: "Relume placeholder image",
                },
            },
        },
        // ... rest of the tabs array remains unchanged
    ],
};

export default Layout508;