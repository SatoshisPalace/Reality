local json = require('json')
-- LlamaLand
-- VERSE_TARGET = '9a_YP6M7iN7b6QUoSvpoV3oe3CqxosyuJnraCucy5ss'
-- Testland
VERSE_TARGET = 'Kh-PHmaRt0bykGUgyK4euVSknML6yHIwQPyR5xPvXxg'

Send({
  Target = VERSE_TARGET,
  Tags = {
    Action = 'VerseEntityCreate',
  },
  Data = json.encode({
    Type = 'Hidden',
    Position = { 10, 10 }, --{ 6.5, 0 },
    Metadata = {
      Interaction = {
        Type = 'Warp',
        Size = { 0.5, 1 }
      },
    }
  })
})

Send({
  Target = VERSE_TARGET,
  Tags = {
    Action = 'VerseEntityHide',
  },
})
