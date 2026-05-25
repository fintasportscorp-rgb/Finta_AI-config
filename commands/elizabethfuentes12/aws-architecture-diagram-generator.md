---
name: drawio
description: >
  Use this skill when the user asks to create, update, or review an AWS architecture diagram in draw.io format —
  for example, "create a diagram", "update the architecture", "draw the flow", "make a drawio",
  or "/drawio". Generates professional AWS architecture diagrams using native AWS4 icons, color-coded flows,
  and region containers.
---

# AWS Architecture Diagrams — draw.io (.drawio)

Generate draw.io XML files for AWS architecture diagrams following these conventions.

---

## Step 0 — Understand the Architecture First

Before creating a diagram:
1. Read the CDK stack or infrastructure code to identify all AWS resources
2. Identify the data flow (ingress → processing → egress)
3. Group resources by stack or logical boundary

---

## 1 — File Structure

```xml
<mxfile host="app.diagrams.net" agent="Claude Code" version="24.0.0">
  <diagram name="Diagram Name" id="unique-id">
    <mxGraphModel dx="1800" dy="1000" grid="0" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <!-- Resources and edges here -->
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## 2 — Region Container (Required)

All AWS resources must be inside a region container:

```xml
<mxCell id="region" value="Region" style="points=[[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1,0.25],[1,0.5],[1,0.75],[1,1],[0.75,1],[0.5,1],[0.25,1],[0,1],[0,0.75],[0,0.5],[0,0.25]];outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;container=1;pointerEvents=0;collapsible=0;recursiveResize=0;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_region;strokeColor=#00A4A6;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#147EBA;dashed=1;" vertex="1" parent="1">
  <mxGeometry x="150" y="150" width="900" height="400" as="geometry" />
</mxCell>
```

Resources inside the region use `parent="region"` (the region's id).
External actors (users, third-party APIs) use `parent="1"`.

---

## 3 — AWS Service Icons

### IMPORTANT: Labels must use the FULL service name
Always use complete AWS service names: "Amazon DynamoDB", "Amazon S3", "AWS Lambda", "Amazon SNS Topic", etc.
Never abbreviate to just "DynamoDB", "S3", or "Lambda" in labels.

### CRITICAL: ALWAYS use `resourceIcon` style — NEVER use native shapes
Native shapes like `shape=mxgraph.aws4.lambda_function`, `shape=mxgraph.aws4.topic`,
`shape=mxgraph.aws4.bucket`, `shape=mxgraph.aws4.dynamodb_stream` render with an
unofficial hand-drawn/sketch style. They look inconsistent and unprofessional.

**ALWAYS use `shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.SERVICE`** for ALL
AWS services. This renders the official AWS icon inside a clean rounded square.

### IMPORTANT: DynamoDB vs DynamoDB Stream are DIFFERENT icons
- **Amazon DynamoDB** (table): `resIcon=mxgraph.aws4.dynamodb`
- **DynamoDB Stream**: `resIcon=mxgraph.aws4.dynamodb_stream`

### Complete service icon reference (ALL use resourceIcon):

| Service | resIcon | fillColor |
|---------|---------|-----------|
| AWS Lambda | `resIcon=mxgraph.aws4.lambda` | `#ED7100` |
| Amazon SNS | `resIcon=mxgraph.aws4.sns` | `#E7157B` |
| Amazon DynamoDB | `resIcon=mxgraph.aws4.dynamodb` | `#C925D1` |
| DynamoDB Stream | `resIcon=mxgraph.aws4.dynamodb_stream` | `#C925D1` |
| Amazon S3 | `resIcon=mxgraph.aws4.s3` | `#3F8624` |
| Amazon API Gateway | `resIcon=mxgraph.aws4.api_gateway` | `#E7157B` |
| Amazon Bedrock AgentCore | `resIcon=mxgraph.aws4.bedrock` | `#01A88D` | NOTE: `bedrock_agentcore` does NOT render. Use `bedrock` instead. |
| Amazon Bedrock | `resIcon=mxgraph.aws4.bedrock` | `#01A88D` |
| Amazon Transcribe | `resIcon=mxgraph.aws4.transcribe` | `#01A88D` |
| AWS Secrets Manager | `resIcon=mxgraph.aws4.secrets_manager` | `#DD344C` |
| AWS Systems Manager | `resIcon=mxgraph.aws4.systems_manager_parameter_store` | `#E7157B` |
| AWS IAM | `resIcon=mxgraph.aws4.identity_and_access_management` | `#DD344C` |
| Amazon SQS | `resIcon=mxgraph.aws4.sqs` | `#E7157B` |
| Amazon Connect | `resIcon=mxgraph.aws4.connect` | `#3334B9` |
| End User Messaging | `resIcon=mxgraph.aws4.end_user_messaging` | `#E7157B` |

### Template (use for ALL services, change resIcon and fillColor):
```xml
<mxCell id="my_service" value="Service Name&lt;div&gt;Sub-label&lt;/div&gt;" style="sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#FILLCOLOR;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.SERVICE;" vertex="1" parent="region">
  <mxGeometry x="300" y="150" width="60" height="60" as="geometry" />
</mxCell>
```

---

## 4 — External Actors

### WhatsApp users:
```xml
<mxCell id="user" value="WhatsApp Users" style="dashed=0;outlineConnect=0;html=1;align=center;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;shape=mxgraph.weblogos.whatsapp;fillColor=#00E676;strokeColor=#dddddd" vertex="1" parent="1">
  <mxGeometry x="-10" y="310" width="74.4" height="74.8" as="geometry" />
</mxCell>
```

### Generic internet/API:
```xml
<mxCell id="external" value="External&lt;div&gt;API&lt;/div&gt;" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#232F3E;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.general_internet_gateway;" vertex="1" parent="1">
  <mxGeometry x="110" y="273" width="78" height="78" as="geometry" />
</mxCell>
```

---

## 5 — Edges (Color-Coded Flows)

Use different colors to represent different stages of the data flow:

| Flow Stage | Color | Usage |
|------------|-------|-------|
| Raw/inbound messages | `#009900` (green) | User input to first processing |
| Buffered messages | `#FF0000` (red) | DDB Stream to tumbling window to processor |
| Processed/outbound | `#FF8000` (orange) | Processor to downstream services |
| Response flow | `#0066CC` (blue) | Reply path back to user |
| Internal connections | `#01A88D` (teal) | AgentCore/Bedrock internal |

### Edge template:
```xml
<mxCell id="e_source_target" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;flowAnimation=1;strokeColor=#009900;strokeWidth=2;" edge="1" parent="region" source="source_id" target="target_id">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
```

### Rules:
- ALL edges use `strokeWidth=2`
- ALL edges use `flowAnimation=1` (animated in draw.io)
- For buffered flow, add `flowAnimationDuration=1000`
- Use `edgeStyle=orthogonalEdgeStyle` (right-angle connectors)
- For bidirectional: `startArrow=classic;startFill=1`

---

## 6 — Legend (Required)

Always add a color legend at the bottom of the diagram:

```xml
<!-- Legend title -->
<mxCell id="legend_title" value="Line Colors" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;fontSize=15;fontStyle=1" vertex="1" parent="1">
  <mxGeometry x="150" y="580" width="100" height="30" as="geometry" />
</mxCell>

<!-- Legend line + label (repeat per color) -->
<mxCell id="leg1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;flowAnimation=1;strokeColor=#009900;strokeWidth=2;endArrow=none;endFill=0;" edge="1" parent="1">
  <mxGeometry relative="1" as="geometry">
    <mxPoint x="260" y="595" as="sourcePoint" />
    <mxPoint x="320" y="595" as="targetPoint" />
  </mxGeometry>
</mxCell>
<mxCell id="leg1_text" value="Raw messages" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;rounded=0;" vertex="1" parent="1">
  <mxGeometry x="325" y="582" width="120" height="25" as="geometry" />
</mxCell>
```

---

## 7 — Layout Rules

1. **Left-to-right flow**: User to ingress to processing to egress
2. **External actors** outside the region container (left side)
3. **Main flow** arranged horizontally along a center line
4. **Supporting services** (S3, Transcribe, Secrets) below the main flow
5. **Stack boundaries**: Use dashed rounded rectangles with colored borders to group stacks
6. **Spacing**: ~100-130px between services horizontally, ~150px vertically to supporting services
7. **Icon sizes**: Native shapes 48x48, resourceIcon 60x60 or 78x78 for emphasis
8. **Labels**: Use `&lt;div&gt;` for multi-line labels in `value=`
9. **Font**: `fontSize=12` for labels, `fontSize=11` for small labels, `fontSize=14;fontStyle=1` for titles

---

## 8 — Stack Boundaries (Multi-Stack Diagrams)

```xml
<mxCell id="stack01_box" value="Stack 01: Name" style="rounded=1;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#147EBA;strokeWidth=2;dashed=1;fontSize=14;fontStyle=1;fontColor=#147EBA;verticalAlign=top;align=left;spacingLeft=10;spacingTop=5;" vertex="1" parent="region">
  <mxGeometry x="20" y="30" width="650" height="290" as="geometry" />
</mxCell>
```

Stack border colors:
- Stack 00 (AgentCore): `#FF8000` (orange)
- Stack 01 (End User Messaging): `#147EBA` (blue)
- Stack 02 (API Gateway): `#8C4FFF` (purple)

---

## 9 — Common Mistakes to Avoid

1. **Labels block vertical edges**: When icons have `verticalLabelPosition=bottom`, ANY vertical edge going down from that icon crosses the label text. Solution: use `verticalLabelPosition=top;verticalAlign=bottom` for icons in the TOP row so labels go ABOVE, leaving the space below clean for vertical edges to Row 2.
2. **Missing `flowAnimation=1;strokeWidth=2`** on edges: ALL edges must have both. Without these the diagram looks static.
2. **DynamoDB table icon vs Stream icon**: `resIcon=mxgraph.aws4.dynamodb` (table) is NOT the same as `shape=mxgraph.aws4.dynamodb_stream` (stream). Never confuse them.
3. **Edges passing through labels**: Service labels (below icons) take ~40px vertical space. Route edges with waypoints that avoid y-ranges occupied by labels. Add at least 50px clearance below icons.
4. **Edges passing through icons**: Use `Array as="points"` with intermediate `mxPoint` waypoints to route around service icons.
5. **Inconsistent icon sizes**: ALL icons must be exactly 60x60. No exceptions for any service.
6. **Abbreviated service names**: Always use full names: "Amazon S3", "Amazon DynamoDB", "AWS Lambda", "Amazon SNS Topic", etc.
7. **SDK/API objects that are separate services**: If a service has a separate component (e.g., DynamoDB + DynamoDB Stream), show them as separate icons with an edge between them.
8. **External services inside the region**: Third-party APIs (TwelveLabs, Meta Cloud API) must be OUTSIDE the region container with `parent="1"`.

---

## 10 — External Brand Logos

For third-party services, use `shape=image` with external CDN URLs:

```xml
<mxCell id="meta" value="Meta&lt;div&gt;Cloud API&lt;/div&gt;" style="shape=image;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;aspect=fixed;imageAspect=0;image=https://cdn.simpleicons.org/meta/0081FB;" vertex="1" parent="1">
  <mxGeometry x="160" y="180" width="60" height="60" as="geometry" />
</mxCell>
```

**Simple Icons CDN**: `https://cdn.simpleicons.org/{name}/{color}`
- Available: meta, facebook, whatsapp, amazon, google, slack, youtube, etc.
- Color is optional hex without `#`
- YouTube: `https://cdn.simpleicons.org/youtube/FF0000`
- Meta: `https://cdn.simpleicons.org/meta/0081FB`

**Known brand logo URLs**:
- Strands Agents: `https://strandsagents.com/latest/assets/logo-github.svg`
- TwelveLabs: `https://vectorseek.com/wp-content/uploads/2025/12/TwelveLabs-Logo-PNG-SVG-Vecto-01.png`

**Built-in weblogos**: `shape=mxgraph.weblogos.whatsapp` (preferred when available)

**Note**: External images require internet. For offline use, prefer built-in shapes.

---

## 11 — Exporting to JPG

If draw.io desktop app is installed, export from CLI:

```bash
/path/to/draw.io --export --format jpg --quality 95 --border 10 --output output.jpg input.drawio
```

On macOS the binary is typically at:
```bash
/Applications/draw.io.app/Contents/MacOS/draw.io
```

Save exported JPGs in `images/diagram.jpg` within each stack directory and reference in README:
```markdown
![Architecture](./images/diagram.jpg)
```

---

## 12 — Self-Review Process (MANDATORY)

Before declaring a diagram "done", ALWAYS self-review by exporting and visually inspecting:

```bash
DRAWIO="/path/to/draw.io.app/Contents/MacOS/draw.io"
"$DRAWIO" --export --format jpg --quality 95 --border 10 --output /tmp/review.jpg diagram.drawio
```

Then use the Read tool to view the JPG and check for:
1. **Lines crossing labels**: If any edge passes through service name text, adjust waypoints
2. **Overlapping elements**: Boxes, icons, or text overlapping each other
3. **Missing connections**: All supporting services (S3, Transcribe, Secrets) connected
4. **Icon rendering**: All icons showing correctly (not empty squares)
5. **Consistent sizing**: All icons same size
6. **Label readability**: All labels fully visible and not cut off

If issues found, fix and re-export until clean. Iterate up to 3 times.

**Edge routing strategy to avoid label overlap:**
- Labels are ~40px below icons (icon y + 60 + 40 = icon y + 100)
- Route horizontal edges at y = icon_bottom + 50 minimum (50px below icon)
- For vertical connections to Row 2, go LEFT or RIGHT first, then down — avoid going straight through Row 1 labels
- Use intermediate waypoints at empty x-coordinates (between icons)

---

## 13 — Checklist Before Delivering

- [ ] All AWS resources inside a region container
- [ ] External actors (users, third-party APIs) outside the region
- [ ] ALL edges have `flowAnimation=1` AND `strokeWidth=2`
- [ ] No edge passes through any icon OR its label text
- [ ] All icons are exactly 60x60
- [ ] DynamoDB table and DynamoDB Stream use different icons
- [ ] All labels use full AWS service names
- [ ] Color legend at bottom
- [ ] Description text block at top with flow explanation
- [ ] Labels use HTML `&lt;div&gt;` for multi-line text
- [ ] File extension is `.drawio`
