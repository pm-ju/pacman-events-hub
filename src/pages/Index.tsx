import { useState } from 'react';
import StorybookIntro from '@/components/Storybook/StorybookIntro';
import StoryBookContainer from '@/components/Storybook/StoryBookContainer';

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Intro animation */}
      {!introComplete && (
        <StorybookIntro onComplete={() => setIntroComplete(true)} />
      )}
      
      {/* Main storybook interface */}
      {introComplete && <StoryBookContainer />}
    </div>
  );
};

export default Index;
