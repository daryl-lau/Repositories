const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svgs', false, /.svg$/)
requireAll(req)
