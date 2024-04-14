"use client";

import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { createItem } from "@directus/sdk";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

const CTACard = ({ dictionary }: { dictionary: any }) => {
  const [email, setEmail] = useState("");
  const [isHandling, setIsHandling] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsHandling(true);
      await directus.request(
        createItem("subscribers", {
          email,
        })
      );
      setIsHandling(false);
      setEmail("");
    } catch (error) {
      console.log(error);
      setIsHandling(false);
    }
  };

  return (
    <div className="relative overflow-hidden px-6 py-10 rounded-md bg-slate-100">
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />
      <Image
        fill
        className="object-cover object-center"
        alt="CTA Card Image"
        src="https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80"
      />
      <div className="relative z-20">
        <div className="text-lg font-medium">#exploretheworld</div>
        <h3 className="mt-3 text-4xl font-semibold">
          {dictionary.ctaCard.title}
        </h3>
        <p className="max-w-lg mt-2 text-lg">
          {dictionary.ctaCard.description}
        </p>
        <form
          onSubmit={submitHandler}
          className="flex items-center w-full gap-2 mt-6"
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={dictionary.ctaCard.placeholder}
            className="w-full px-3 py-2 md:w-auto text-base rounded-md outline-none bg-white/80 placeholder:text-sm focus:ring-2 ring-neutral-600"
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-md whitespace-nowrap bg-neutral-900 text-neutral-200"
          >
            {!isHandling ? dictionary.ctaCard.button : "Sending..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CTACard;
