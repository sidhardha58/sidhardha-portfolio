"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl mx-auto ">
      <SectionHeader id='contact' className="mb-14" title={
        <>
          LET&apos;S WORK <br />
          TOGETHER
        </>} />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 mx-4">
        <Card className="w-full min-w-0 bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl mt-10 md:mt-20">
          <CardHeader>
            <CardTitle className="text-4xl">Contact Form</CardTitle>
            <CardDescription className="space-y-2 text-base">
              <span className="block">
                <a href={`mailto:${config.email}`} className="underline">
                  {config.email}
                </a>
              </span>
              <span className="block">
                <a href={`tel:${config.phone.replace(/\s/g, "")}`}>{config.phone}</a>
              </span>
              <span className="block">{config.location}</span>
              <span className="block pt-2">Or leave a note. It opens in WhatsApp.</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
