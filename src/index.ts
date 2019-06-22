import React, { useState, useMemo, useRef, createRef } from 'react';
import { Canvas, useRender, applyProps } from 'react-three-fiber';

export function useTransientData<T>(dataSource: T, mapDataSource: (source: T) => object) {
  const bind = useRef<any>();
  useRender(() => applyProps(bind.current, mapDataSource(dataSource)));
  return bind;
}

export function useTransientDataList<T>(dataSources: T[], mapDataSource: (source: T) => object, amount: number = dataSources.length) {
  const refsRef = useRef<Array<React.MutableRefObject<any>>>([]);
  // update refs array only when "amount" changed
  refsRef.current = useMemo(() => {
    const elementRefs: Array<React.MutableRefObject<any>> = [];
    for (let count = 0; count < amount; count += 1) {
      elementRefs.push(createRef<any>());
    }
    return elementRefs;
  }, [amount]);
  useRender(() => {
    refsRef.current.forEach((ref, index) => {
      // after this ref attached to the element, and data is prepared
      if (ref.current && dataSources[index]) {
        const props = mapDataSource(dataSources[index]);
        applyProps(ref.current, props);
      }
    });
  }, false, [dataSources]);
  return refsRef.current;
}