namespace Lesson09.Services {
    export class AutoService {        
        private autoResource: ng.resource.IResourceClass<Models.Auto>;

        constructor(
            $resource: ng.resource.IResourceService
        ) {
            this.autoResource = $resource<Models.Auto>('/api/autos/:id', null, {
                'update': { method:'PUT' }
            });
        }

        public getAutos(): Models.Auto[] {
            return this.autoResource.query();
        }

        public getAuto(id: number): Models.Auto {
            return this.autoResource.get({id: id});
        }

        public createAuto(auto: any): void {
            this.autoResource.save(auto);
        }

        public updateAuto(auto: any): void {
            this.autoResource['update']({id: auto.id}, auto);
        }

        public deleteAuto(id: number): void {
            this.autoResource.delete({id: id});
        }

    }
}