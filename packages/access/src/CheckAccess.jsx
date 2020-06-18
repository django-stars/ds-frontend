import { connect } from 'react-redux'
import { createContext } from 'react'
import PropTypes from 'prop-types'

const F_PUBLIC = 2 ** 0
export const CheckAccessContext = createContext()

CheckAccessProvider.propTypes = {
  level: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
}

function CheckAccessProvider({ children, level }) {
  return (
    <CheckAccessContext.Provider value={level}>
      {children}
    </CheckAccessContext.Provider>
  )
}

export default connect(
  (state, props) => ({
    level: props.userLevelSelector ? props.userLevelSelector(state) : F_PUBLIC,
  })
)(CheckAccessProvider)

CheckAccess.propTypes = {
  access: PropTypes.number,
  fallback: PropTypes.node,
  children: PropTypes.node.isRequired,
}

CheckAccess.defaultProps = {
  access: F_PUBLIC,
  fallback: null,
}

export function CheckAccess({ access = F_PUBLIC, children, fallback }) {
  return (
    <CheckAccessContext.Consumer>
      {level => {
        return level & access ? children : fallback
      }}
    </CheckAccessContext.Consumer>
  )
}
