const Compute = require('@google-cloud/compute');
const compute = new Compute();

exports.resetInstance = async (event, context, callback) => {
  const data = JSON.parse(Buffer.from(event.data, 'base64').toString());
  const vm   = await getVm(data);

  try {
    await vm.reset();
  } catch (err) {
    console.error(err);
    callback(err);
  }
}

async function getVm(data) {
  const zone       = compute.zone(data.incident.resource.labels.zone);
  const vmname     = data.incident.resource_display_name;
  const vminstance = zone.vm(vmname);

  return vminstance;
}
