import Link from "next/link";

const User = () => {
    return (
        <div>
        
        <section className="pt-16 bg-blueGray-50">
        <div className="w-full md:w-2/3 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words border w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="flex justify-center">
                    <img alt="..." src="https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" className="shadow-xl rounded-full absolute md:h-44 h-24 align-middle border-none md:-top-24 -top-12 md:w-44 w-24 bg-base-100 justify-center " />
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4  pt-8">
                    <div className="mr-4 p-3 md:py-6 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        22
                      </span>
                      <span className="text-sm text-blueGray-400">Flowing</span>
                    </div>
                    <div className="mr-4 p-3 md:py-6 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">Flowers</span>
                    </div>
                    <div className="lg:mr-4 p-3 md:py-6 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Posts
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                  Jenna Stones
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  Los Angeles, California
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div>
              </div>
              <div className="mt-10 border-t border-blueGray-200 ">
                <div className="flex flex-wrap w-full justify-center">
                  <div className="w-full">
                  <div className="flex flex-row overflow-hidden md:h-32 bg-base-100 sm:h-24 border shadow-lg">
            <img
              className="block md:w-44 w-28  flex-none bg-cover md:h-auto h-24 object-cover"
              src="https://images.pexels.com/photos/1302883/pexels-photo-1302883.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            />
            <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal">
              <div className="font-bold md:text-xl sm:text-base text-sm mb-2 leading-tight">
               <Link href={'/blog/1'}> Can coffee make you a bitter developer?</Link>
              </div>
              <div className="flex gap-3">
                <Link className="text-blue-400" href={'/edit/1'}>Edit</Link>
                <Link className="text-error" href={'/edit/1'}>Delete</Link>
              </div>
            </div>
          </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
        </div>
    );
};

export default User;