# @linonetwo/use-transient-updates

[what are transient updates?](https://github.com/react-spring/zustand#transient-updates-for-often-occuring-state-changes)

[Further explain about transient updates.](https://github.com/drcmda/react-three-fiber/issues/61#issuecomment-504472284)

[Discussion about implementation.](https://github.com/drcmda/react-three-fiber/issues/126)

## Usage

```jsx
import { useComponent } from 'react-encompass-ecs';
import { useTransientDataList } from '@linonetwo/use-transient-updates';

function Planes() {
  const { boxes } = useComponent({ boxes: [PositionComponent] });
  const refs = useTransientDataList(boxes, ([{ x, y }]) => ({ position: [x, y, 0] }));
  return (
    <>
      {refs.map((_, index) => (
        <mesh ref={refs[index]} receiveShadow={true} key={index}>
          <planeBufferGeometry attach="geometry" args={[20, 20]} />
          <meshPhongMaterial attach="material" color="#272727" />
        </mesh>
      ))}
    </>
  );
}
```

```jsx
import { useComponent } from 'react-encompass-ecs';
import { useTransientData } from '@linonetwo/use-transient-updates';

function Plane({ position, index }: { position: { x: number, y: number }, index: number }) {
  return (
    <mesh
      ref={useTransientData({ position }, ({ position: { x, y } }) => ({ position: [x, y, 0] }))}
      receiveShadow={true}
    >
      <planeBufferGeometry attach="geometry" args={[20, 20]} />
      <meshPhongMaterial attach="material" color="#272727" />
    </mesh>
  );
}
```
