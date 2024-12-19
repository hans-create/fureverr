import React, { useState } from 'react';
import styled from 'styled-components';

const MemoryBox = styled.div`
  // ... existing styles ...
  &:last-child {
    pointer-events: none;
    opacity: 0.6;
  }
`;

const CTAButton = styled.button`
  // ... existing styles ...
  margin: 0 auto;  // Center the button
  display: block;
`;

const CreateMemorial: React.FC = () => {
  const [memories, setMemories] = useState([]);

  const handleMemoryCreation = () => {
    // Logic to create a new memory
  };

  return (
    <div>
      <MemoryBox>
        {/* ... memory box content ... */}
      </MemoryBox>
      
      <CTAButton onClick={handleMemoryCreation}>
        Create Memories
      </CTAButton>
    </div>
  );
};

export default CreateMemorial; 