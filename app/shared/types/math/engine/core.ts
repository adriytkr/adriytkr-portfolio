export interface RenderContext{
  xScale:d3.ScaleLinear<number,number>;
  yScale:d3.ScaleLinear<number,number>;
  activeCamera:CameraObject;
  getObjectStyle:GetObjectStyle;
};
