import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';
import MatchBlock from '../../components/matchBlock';

export default class MatchesList extends Component {
  state = {};
  showMatches() {
    const { matches } = this.props;
    if (!matches) return null;
    return (
      <NodeGroup
        keyAccessor={d => d.id}
        data={matches}
        start={() => ({
          opacity: 0,
          x: -30
        })}
        enter={(d, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 300, delay: i * 50, ease: easePolyOut }
        })}
        leave={() => ({
          opacity: [0],
          x: [-30]
        })}>
        {nodes => (
          <>
            {nodes.map(({ key, data, state: { x, opacity } }) => (
              <li
                key={key}
                className='match_box_big'
                style={{
                  opacity,
                  maxWidth: '700px',
                  transform: `translate(${x}px)`
                }}>
                <MatchBlock match={data} />
              </li>
            ))}
          </>
        )}
      </NodeGroup>
    );
  }
  render() {
    return <ul className='matches_list'>{this.showMatches()}</ul>;
  }
}
