import React from 'react';
import styled from 'styled-components';

import HandlerSvg from 'edaam/handler/handler.svg';
import StorageSvg from 'edaam/storage/storage.svg';
import InternalEventSvg from 'edaam/event/internal-event.svg';
import ExternalEventSvg from 'edaam/event/external-event.svg';

const WelcomePaneRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items; center;
  flex-grow: 1;
  padding: 20px;
`;

const WelcomePaneHeader = styled.div`
  width: 100%;
`;

const WelcomeTitle = styled.h1`
  font-weight: normal;
`;

const ScootrStudioSpan = styled.span`
  font-weight: bold;
`;

const WelcomeBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const WelcomeBodyText = styled.p``;

const WelcomeBodyList = styled.ul`
  margin-top: 8px;
  margin-bottom: 8px;
`;

const WelcomeBodyListItem = styled.li`
  margin-top: 8px;

  &:first-child {
    margin-top: 0px;
  }
`;

const ResourceDescriptionsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

const ResourceDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 170px;
  padding: 15px;
  border-left: 1px solid ${({ theme }) => theme.colors.backgrounds.light};

  &:first-child {
    border-left: none;
  }
`;

const ResourceTitle = styled.p``;

const ResourceDescriptionContent = styled.p`
  text-align: center;
`;

const descriptions = [
  {
    title: 'External Event',
    description: 'HTTP events that trigger your compute resources.',
    Svg: ExternalEventSvg,
  },
  {
    title: 'Handler',
    description: 'Contains the code you use to handle events and implement your business logic.',
    Svg: HandlerSvg,
  },
  {
    title: 'Storage',
    description: 'Persistant storage for your data.',
    Svg: StorageSvg,
  },
  {
    title: 'Internal Event',
    description: 'Events emmitted by a compute resource that then trigger another compute resource.',
    Svg: InternalEventSvg,
  },
];

export default function MustSelectPane() {
  return (
    <WelcomePaneRoot>
      <WelcomePaneHeader>
        <WelcomeTitle>
          Welcome to <ScootrStudioSpan>Scootr Studio</ScootrStudioSpan>!
        </WelcomeTitle>
      </WelcomePaneHeader>
      <WelcomeBody>
        <WelcomeBodyText>
          <strong>Drag</strong> a resource from the left and <strong>drop</strong> it onto the canvas to get started!
        </WelcomeBodyText>
        <ResourceDescriptionsContainer>
          {descriptions.map(function (d) {
            return (
              <ResourceDescription key={d.title}>
                <ResourceTitle>{d.title}</ResourceTitle>
                <d.Svg width={30} height={30} />
                <ResourceDescriptionContent>{d.description}</ResourceDescriptionContent>
              </ResourceDescription>
            );
          })}
        </ResourceDescriptionsContainer>
        <WelcomeBodyText>
          <strong>Connect</strong> two resources together to define the interactions between them in your serverless
          application:
        </WelcomeBodyText>
        <WelcomeBodyList>
          <WelcomeBodyListItem>
            <strong>Triggers</strong> are connections from an event to a compute. They are represented by a{' '}
            <strong>dashed line</strong>.
          </WelcomeBodyListItem>
          <WelcomeBodyListItem>
            <strong>References</strong> are connections from a compute to a storage or internal event resource. They are
            represented by a <strong>solid line</strong> and can be selected and configured from the canvas.
          </WelcomeBodyListItem>
        </WelcomeBodyList>
        <WelcomeBodyText>
          If anything in your configuration is invalid, you will see <strong>yellow alerts</strong> informing you that
          something needs to be fixed. Once you have a valid configuration, just click the deploy button to make your
          serverless app go live!
        </WelcomeBodyText>
      </WelcomeBody>
    </WelcomePaneRoot>
  );
}
