import Mixin from '@ember/object/mixin';
// import collectObject from 'admin/utils/collect-object';

export default Mixin.create({
  // TODO: use templateName
  renderTemplate(controller) {
    const routeName = this.get('routeName')
    // const controllerQueryParams = this.get('controllerQueryParams') || []
    const componentName = `z-routes/${routeName}-route`.replace(/\./g, '-route/')

    // controller.reopen({
    //   queryParams: controllerQueryParams,
    //   controllerQueryParams: collectObject(...controllerQueryParams)
    // })

    controller.set('componentName', componentName);

    this.render(`r-component`, {
      controller
    })
  }
})
