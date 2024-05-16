import React, { FC, lazy, Suspense } from "react";
const Menu = lazy(() => import("../../../components/menu/Menu"));
const PollInput = lazy(() => import("../../../components/Polls/PollInput"));
const RightSideBar = lazy(() => import("../../../components/rightSideBar/RightSideBar"));

const PollPage: FC = () => {
   return (
      <>
         <Suspense fallback={<div>Loading...</div>}>
            <Menu />
         </Suspense>

         <Suspense fallback={<div>Loading...</div>}>
            <PollInput />
         </Suspense>

         <Suspense fallback={<div>Loading...</div>}>
            <RightSideBar />
         </Suspense>
      </>
   );
};

export default PollPage;
