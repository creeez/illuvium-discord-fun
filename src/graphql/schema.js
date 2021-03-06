import gql from "graphql-tag";

export default gql`
  #######################
  # Input Schema
  #######################

  type Illuvial {
    id: ID!
    name: String! @search
    tier: Int @search
    stage: Int! @search
    class: Class @search
    affinity: Affinity @search
    range: Range @search
    genus: Genus @search
    skills(filter: SkillsFilter): Skills
    pic: String
  }

  type Skills {
    basicAttack: String
    ultimateAttack: String
    criticalAttack: String
    dieOrFaint: String
    tauntAnimation: String
    walkingAnimation: String
    idleAnimation: String
  }

  enum Genus {
    Amphibian
    Quadrupeds
    Mammoth
    Elephant
  }

  enum Stage {
    One
    Two
    Three
  }

  enum Affinity {
    Water
    Fire
    Earth
    Air
    Nature
    Steam
    Mud
    Overgrowth
    Psychic
  }

  enum Class {
    Phantom
    Psion
    Poison
    Guardian
    Harbinger
    Rogue
    Sentinel
    Sentinal
    Invoker
    Fighter
    Empath
  }

  enum Range {
    Short
    Medium
    Long
  }

  #######################
  # Extended Definitions
  #######################

  """
  The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
  Int64 can represent values in range [-(2^63),(2^63 - 1)].
  """
  scalar Int64

  """
  The DateTime scalar type represents date and time as a string in RFC3339 format.
  For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
  """
  scalar DateTime

  input IntRange {
    min: Int!
    max: Int!
  }

  input FloatRange {
    min: Float!
    max: Float!
  }

  input Int64Range {
    min: Int64!
    max: Int64!
  }

  input DateTimeRange {
    min: DateTime!
    max: DateTime!
  }

  input StringRange {
    min: String!
    max: String!
  }

  enum DgraphIndex {
    int
    int64
    float
    bool
    hash
    exact
    term
    fulltext
    trigram
    regexp
    year
    month
    day
    hour
    geo
  }

  input AuthRule {
    and: [AuthRule]
    or: [AuthRule]
    not: AuthRule
    rule: String
  }

  enum HTTPMethod {
    GET
    POST
    PUT
    PATCH
    DELETE
  }

  enum Mode {
    BATCH
    SINGLE
  }

  input CustomHTTP {
    url: String!
    method: HTTPMethod!
    body: String
    graphql: String
    mode: Mode
    forwardHeaders: [String!]
    secretHeaders: [String!]
    introspectionHeaders: [String!]
    skipIntrospection: Boolean
  }

  type Point {
    longitude: Float!
    latitude: Float!
  }

  input PointRef {
    longitude: Float!
    latitude: Float!
  }

  input NearFilter {
    distance: Float!
    coordinate: PointRef!
  }

  input PointGeoFilter {
    near: NearFilter
    within: WithinFilter
  }

  type PointList {
    points: [Point!]!
  }

  input PointListRef {
    points: [PointRef!]!
  }

  type Polygon {
    coordinates: [PointList!]!
  }

  input PolygonRef {
    coordinates: [PointListRef!]!
  }

  type MultiPolygon {
    polygons: [Polygon!]!
  }

  input MultiPolygonRef {
    polygons: [PolygonRef!]!
  }

  input WithinFilter {
    polygon: PolygonRef!
  }

  input ContainsFilter {
    point: PointRef
    polygon: PolygonRef
  }

  input IntersectsFilter {
    polygon: PolygonRef
    multiPolygon: MultiPolygonRef
  }

  input PolygonGeoFilter {
    near: NearFilter
    within: WithinFilter
    contains: ContainsFilter
    intersects: IntersectsFilter
  }

  input GenerateQueryParams {
    get: Boolean
    query: Boolean
    password: Boolean
    aggregate: Boolean
  }

  input GenerateMutationParams {
    add: Boolean
    update: Boolean
    delete: Boolean
  }

  directive @hasInverse(field: String!) on FIELD_DEFINITION
  directive @search(by: [DgraphIndex!]) on FIELD_DEFINITION
  directive @dgraph(
    type: String
    pred: String
  ) on OBJECT | INTERFACE | FIELD_DEFINITION
  directive @id on FIELD_DEFINITION
  directive @withSubscription on OBJECT | INTERFACE
  directive @secret(field: String!, pred: String) on OBJECT | INTERFACE
  directive @auth(
    password: AuthRule
    query: AuthRule
    add: AuthRule
    update: AuthRule
    delete: AuthRule
  ) on OBJECT | INTERFACE
  directive @custom(http: CustomHTTP, dql: String) on FIELD_DEFINITION
  directive @remote on OBJECT | INTERFACE | UNION | INPUT_OBJECT | ENUM
  directive @cascade(fields: [String]) on FIELD
  directive @lambda on FIELD_DEFINITION
  directive @cacheControl(maxAge: Int!) on QUERY
  directive @generate(
    query: GenerateQueryParams
    mutation: GenerateMutationParams
    subscription: Boolean
  ) on OBJECT | INTERFACE

  input IntFilter {
    eq: Int
    le: Int
    lt: Int
    ge: Int
    gt: Int
    between: IntRange
  }

  input Int64Filter {
    eq: Int64
    le: Int64
    lt: Int64
    ge: Int64
    gt: Int64
    between: Int64Range
  }

  input FloatFilter {
    eq: Float
    le: Float
    lt: Float
    ge: Float
    gt: Float
    between: FloatRange
  }

  input DateTimeFilter {
    eq: DateTime
    le: DateTime
    lt: DateTime
    ge: DateTime
    gt: DateTime
    between: DateTimeRange
  }

  input StringTermFilter {
    allofterms: String
    anyofterms: String
  }

  input StringRegExpFilter {
    regexp: String
  }

  input StringFullTextFilter {
    alloftext: String
    anyoftext: String
  }

  input StringExactFilter {
    eq: String
    in: [String]
    le: String
    lt: String
    ge: String
    gt: String
    between: StringRange
  }

  input StringHashFilter {
    eq: String
    in: [String]
  }

  #######################
  # Generated Types
  #######################

  type AddIlluvialPayload {
    illuvial(
      filter: IlluvialFilter
      order: IlluvialOrder
      first: Int
      offset: Int
    ): [Illuvial]
    numUids: Int
  }

  type AddSkillsPayload {
    skills(
      filter: SkillsFilter
      order: SkillsOrder
      first: Int
      offset: Int
    ): [Skills]
    numUids: Int
  }

  type DeleteIlluvialPayload {
    illuvial(
      filter: IlluvialFilter
      order: IlluvialOrder
      first: Int
      offset: Int
    ): [Illuvial]
    msg: String
    numUids: Int
  }

  type DeleteSkillsPayload {
    skills(
      filter: SkillsFilter
      order: SkillsOrder
      first: Int
      offset: Int
    ): [Skills]
    msg: String
    numUids: Int
  }

  type IlluvialAggregateResult {
    count: Int
    nameMin: String
    nameMax: String
    tierMin: Int
    tierMax: Int
    tierSum: Int
    tierAvg: Float
    stageMin: Int
    stageMax: Int
    stageSum: Int
    stageAvg: Float
    picMin: String
    picMax: String
  }

  type SkillsAggregateResult {
    count: Int
    basicAttackMin: String
    basicAttackMax: String
    ultimateAttackMin: String
    ultimateAttackMax: String
    criticalAttackMin: String
    criticalAttackMax: String
    dieOrFaintMin: String
    dieOrFaintMax: String
    tauntAnimationMin: String
    tauntAnimationMax: String
    walkingAnimationMin: String
    walkingAnimationMax: String
    idleAnimationMin: String
    idleAnimationMax: String
  }

  type UpdateIlluvialPayload {
    illuvial(
      filter: IlluvialFilter
      order: IlluvialOrder
      first: Int
      offset: Int
    ): [Illuvial]
    numUids: Int
  }

  type UpdateSkillsPayload {
    skills(
      filter: SkillsFilter
      order: SkillsOrder
      first: Int
      offset: Int
    ): [Skills]
    numUids: Int
  }

  #######################
  # Generated Enums
  #######################

  enum IlluvialHasFilter {
    name
    tier
    stage
    class
    affinity
    range
    genus
    skills
    pic
  }

  enum IlluvialOrderable {
    name
    tier
    stage
    pic
  }

  enum SkillsHasFilter {
    basicAttack
    ultimateAttack
    criticalAttack
    dieOrFaint
    tauntAnimation
    walkingAnimation
    idleAnimation
  }

  enum SkillsOrderable {
    basicAttack
    ultimateAttack
    criticalAttack
    dieOrFaint
    tauntAnimation
    walkingAnimation
    idleAnimation
  }

  #######################
  # Generated Inputs
  #######################

  input AddIlluvialInput {
    name: String!
    tier: Int
    stage: Int!
    class: Class
    affinity: Affinity
    range: Range
    genus: Genus
    skills: SkillsRef
    pic: String
  }

  input AddSkillsInput {
    basicAttack: String
    ultimateAttack: String
    criticalAttack: String
    dieOrFaint: String
    tauntAnimation: String
    walkingAnimation: String
    idleAnimation: String
  }

  input Affinity_hash {
    eq: Affinity
    in: [Affinity]
  }

  input Class_hash {
    eq: Class
    in: [Class]
  }

  input Genus_hash {
    eq: Genus
    in: [Genus]
  }

  input IlluvialFilter {
    id: [ID!]
    name: StringTermFilter
    tier: IntFilter
    stage: IntFilter
    class: Class_hash
    affinity: Affinity_hash
    range: Range_hash
    genus: Genus_hash
    has: IlluvialHasFilter
    and: [IlluvialFilter]
    or: [IlluvialFilter]
    not: IlluvialFilter
  }

  input IlluvialOrder {
    asc: IlluvialOrderable
    desc: IlluvialOrderable
    then: IlluvialOrder
  }

  input IlluvialPatch {
    name: String
    tier: Int
    stage: Int
    class: Class
    affinity: Affinity
    range: Range
    genus: Genus
    skills: SkillsRef
    pic: String
  }

  input IlluvialRef {
    id: ID
    name: String
    tier: Int
    stage: Int
    class: Class
    affinity: Affinity
    range: Range
    genus: Genus
    skills: SkillsRef
    pic: String
  }

  input Range_hash {
    eq: Range
    in: [Range]
  }

  input SkillsFilter {
    has: SkillsHasFilter
    and: [SkillsFilter]
    or: [SkillsFilter]
    not: SkillsFilter
  }

  input SkillsOrder {
    asc: SkillsOrderable
    desc: SkillsOrderable
    then: SkillsOrder
  }

  input SkillsPatch {
    basicAttack: String
    ultimateAttack: String
    criticalAttack: String
    dieOrFaint: String
    tauntAnimation: String
    walkingAnimation: String
    idleAnimation: String
  }

  input SkillsRef {
    basicAttack: String
    ultimateAttack: String
    criticalAttack: String
    dieOrFaint: String
    tauntAnimation: String
    walkingAnimation: String
    idleAnimation: String
  }

  input UpdateIlluvialInput {
    filter: IlluvialFilter!
    set: IlluvialPatch
    remove: IlluvialPatch
  }

  input UpdateSkillsInput {
    filter: SkillsFilter!
    set: SkillsPatch
    remove: SkillsPatch
  }

  #######################
  # Generated Query
  #######################

  type Query {
    getIlluvial(id: ID!): Illuvial
    queryIlluvial(
      filter: IlluvialFilter
      order: IlluvialOrder
      first: Int
      offset: Int
    ): [Illuvial]
    aggregateIlluvial(filter: IlluvialFilter): IlluvialAggregateResult
    querySkills(
      filter: SkillsFilter
      order: SkillsOrder
      first: Int
      offset: Int
    ): [Skills]
    aggregateSkills(filter: SkillsFilter): SkillsAggregateResult
  }

  #######################
  # Generated Mutations
  #######################

  type Mutation {
    addIlluvial(input: [AddIlluvialInput!]!): AddIlluvialPayload
    updateIlluvial(input: UpdateIlluvialInput!): UpdateIlluvialPayload
    deleteIlluvial(filter: IlluvialFilter!): DeleteIlluvialPayload
    addSkills(input: [AddSkillsInput!]!): AddSkillsPayload
    updateSkills(input: UpdateSkillsInput!): UpdateSkillsPayload
    deleteSkills(filter: SkillsFilter!): DeleteSkillsPayload
  }
`;
