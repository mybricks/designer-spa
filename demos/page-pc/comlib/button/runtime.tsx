import { useEffect, useState } from "react";
import css from "./css.less";
import React from "react";

export default ({ env, data, slots, inputs, outputs }) => {

  const onClick = () => {
    outputs["click"]();

    env.callDomainModel({},'query',{a:3})
  };

  return (
    <button>按钮</button>
  );
};
