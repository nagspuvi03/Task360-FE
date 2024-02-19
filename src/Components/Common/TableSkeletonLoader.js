import React from 'react';
import { Card, CardBody, Table } from 'reactstrap';

const TableSkeletonLoader = () => {
  const rows = 50;
  const cols = 16;

  const SkeletonRow = () => (
    <tr>
      {Array.from({ length: cols }, (_, index) => (
        <td key={index}>
          <div className="skeleton skeleton-text"></div>
        </td>
      ))}
    </tr>
  );

  const skeletonStyles = `
    .skeleton {
        background-color: #ddd;
        border-radius: 4px;
        animation: shimmer 2s infinite linear;
    }

    .skeleton-text {
        height: 1em;
        margin-bottom: .5em;
    }

    @keyframes shimmer {
        0% {
            background-position: -468px 0;
        }
        100% {
            background-position: 468px 0;
        }
    }
  `;

  return (
    <React.Fragment>
        <style>
            {skeletonStyles}
        </style>
        <Card>
            <CardBody>
                <Table hover responsive>
                    <thead>
                        <tr>
                            {Array.from({ length: cols }, (_, index) => (
                                <th key={index}>
                                <div className="skeleton skeleton-text"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: rows }, (_, index) => (
                        <SkeletonRow key={index} />
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    </React.Fragment>
  );
};

export default TableSkeletonLoader;