// This imports the jest-dom matchers (like .toBeInTheDocument())
require('@testing-library/jest-dom');
require('jest-axe/extend-expect');
jest.mock('next/link', () => {
  const PropTypes = require('prop-types');
  // eslint-disable-next-line react/prop-types
  const MockLink = ({ children, href, legacyBehavior, prefetch, ...rest }) => { // NOSONAR
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };
  MockLink.displayName = 'MockLink';
  MockLink.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    legacyBehavior: PropTypes.bool,
    prefetch: PropTypes.bool,
  };
  return MockLink;
});
